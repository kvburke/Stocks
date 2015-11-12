package com.burke.stocks;

import org.codehaus.jackson.annotate.JsonProperty;

public class Month {
int Month;

@JsonProperty("Month")
public int getMonth() {
	return Month;
}

public void setMonth(int month) {
	this.Month = month;
}



}
