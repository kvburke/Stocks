package com.burke.stocks;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class PostGainsPercentagesMapper implements RowMapper<PostGainsPercentages> {
   public PostGainsPercentages mapRow(ResultSet rs, int rowNum) throws SQLException {
      PostGainsPercentages percentages = new PostGainsPercentages();
      percentages.setSymbol(rs.getString("symbol"));
      percentages.setCount(rs.getInt("count(Price)"));
   
      return percentages;
   }
}