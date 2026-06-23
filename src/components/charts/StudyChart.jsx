import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useAnalytics } from "../../context/AnalyticsContext";

export default function StudyChart() {
  const ref = useRef();
  const { sessions } = useAnalytics();

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const width = 300;
    const height = 150;

    const data = sessions.slice(-7);

    const x = d3
      .scaleBand()
      .domain(data.map((_, i) => i))
      .range([0, width])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.duration) || 60])
      .range([height, 0]);

    svg
      .attr("width", width)
      .attr("height", height);

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (_, i) => x(i))
      .attr("y", (d) => y(d.duration))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.duration))
      .attr("fill", "#3b82f6");
  }, [sessions]);

  return <svg ref={ref}></svg>;
}
