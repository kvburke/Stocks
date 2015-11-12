package com.burke.stocks;




import java.util.ArrayList;

import java.util.List;




import javax.sql.DataSource;




import org.springframework.context.ApplicationContext;

import org.springframework.context.support.ClassPathXmlApplicationContext;

import org.springframework.jdbc.core.JdbcTemplate;

import org.springframework.stereotype.Repository;




@Repository

public class ModelClass {

	

	

	




ApplicationContext context = new ClassPathXmlApplicationContext("spring.xml");

//@Autowired




private DataSource dataSource = (DataSource)context.getBean("dataSource");




private JdbcTemplate jdbcTemplateObject = (JdbcTemplate)context.getBean("jdbcTemplate");







private int gstartmonth;

private int gendmonth;




public void setDataSource(DataSource dataSource) {

    this.jdbcTemplateObject = new JdbcTemplate(dataSource);

 }










public void ModelEnterStock(Stock stock){

	String SQL = "insert into Stock (Symbol, Price, Monthpurchased) values (?, ?, ?)";

	

	String stocksymbol = stock.getSymbol();

	int stockprice = stock.getPrice();

	int stockmonth = stock.getMonthpurchased();

	

 

      

      jdbcTemplateObject.update( SQL, stocksymbol, stockprice, stockmonth);

      

}




public List<Percentages> PortfolioPercentages(){

	 String SQL = "select Symbol, sum(Price) from Stock.stock Group by Symbol";

	 List <Percentages> percentages=new ArrayList<Percentages>();

	 	percentages = jdbcTemplateObject.query(SQL, 

                              			new PercentagesMapper());




	return percentages;

}




public List<Price> StockOverTime(StockOverTime stockovertime){

	gstartmonth=stockovertime.startmonth;

	gendmonth=stockovertime.endmonth;

	

	String SQL = "select Price, Monthpurchased from Stock where Symbol = '"+stockovertime.getSymbol()+"' AND Monthpurchased >="+stockovertime.getStartmonth()+" AND Monthpurchased <="+stockovertime.getEndmonth()+" ORDER BY Monthpurchased";




	List <Price> stockovertimelist = jdbcTemplateObject.query(SQL, new PriceMapper());

	System.out.print("Execution of POST reponse"+gstartmonth+""+gendmonth);

   




    return stockovertimelist;




}


public void reset(){
	
	
	String SQL = "TRUNCATE TABLE stock";
	 jdbcTemplateObject.update(SQL);
	
}


public List<Stock> grid(){
	String SQL = "SELECT Symbol, Price, Monthpurchased from stock";
	List<Stock> grid=jdbcTemplateObject.query(SQL, new StockMapper());
	return grid;
}


public List<Custom> postgains(int month){
	String SQL0 = "select * from Stock.stock U1 where (monthpurchased) = (   select max(monthpurchased)    from Stock.stock   where symbol = U1.symbol AND monthpurchased <="+month+") order by symbol ASC LIMIT 0, 1000";
	List<Stock> stockrecord = jdbcTemplateObject.query(SQL0, new StockMapper());
	//symbol, price list
	
	
	
	
	String SQL1= "select symbol, count(price) from stock.stock where Monthpurchased<="+month+" group by symbol order by symbol ASC";
	//symbol, count(price)
	List<PostGainsPercentages> gains=jdbcTemplateObject.query(SQL1, new PostGainsPercentagesMapper());
	//Stock entry=gainprice.get(0);
	//int price=entry.getPrice();
	//String SQL2 = "SELECT Symbol, Price*count(Symbol) from stock group by symbol";
	//List<PostGainsPercentages> gains=jdbcTemplateObject.query(SQL2, new PostGainsPercentagesMapper());
	
	
	Stock[] stockrecordarray= new Stock[stockrecord.size()];
	PostGainsPercentages[] gainsarray =new PostGainsPercentages[gains.size()];
	stockrecord.toArray(stockrecordarray);
	gains.toArray(gainsarray);
	
	ArrayList<Custom> complete = new ArrayList<Custom>();
	
	
	for(int i=0; i<gainsarray.length; i++){
	String symbol=stockrecordarray[i].getSymbol();
	int price=stockrecordarray[i].getPrice();
	int count=gainsarray[i].getCount();
	int multiplied=price*count;
	complete.add(new Custom(symbol, multiplied));
	}
	
	return complete;
}



}