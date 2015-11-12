package com.burke.stocks;

public class Custom {

	public Custom(){
}
	public Custom(String symbol, int count){
		this.symbol=symbol;
		this.count=count;
	}
	
	String symbol;
	int count;
	public String getSymbol() {
		return symbol;
	}
	public void setSymbol(String symbol) {
		this.symbol = symbol;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	
	
	
	
	
}