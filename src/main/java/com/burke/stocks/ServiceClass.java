package com.burke.stocks;

import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



@Service
public class ServiceClass {

	ModelClass model = new ModelClass();
	@Transactional
	public void ServiceEnterStock(Stock stock){
	 model.ModelEnterStock(stock);
	}
	@Transactional
	public List<Percentages> PortfolioPercentages(){
		return model.PortfolioPercentages();
	}
	@Transactional
	public List<Price> stockOverTime(StockOverTime Stockovertime){
		return model.StockOverTime(Stockovertime);
	}
	@Transactional
	public void reset(){
		model.reset();
	}
	@Transactional
	public List<Stock> grid(){
		return model.grid();
	}
	@Transactional
	public List<Custom> postgains(int month){
		return model.postgains(month);
	}
}