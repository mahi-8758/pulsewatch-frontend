function ResponseTime({ data }) {
  const maxValue = Math.max(...data.map((item) => item.value), 100)

  return (
    <section className="panel">
      <div className="panel-header">
        <h2>Response Time</h2>
        <span>Last 7 days</span>
      </div>

      <div className="response-chart" aria-label="Response time chart">
        {data.map((item) => (
          <div key={item.day} className="chart-column">
            <div className="chart-bar-wrap">
              <div
                className="chart-bar"
                style={{ height: `${(item.value / maxValue) * 100}%` }}
                title={`${item.day}: ${item.value} ms`}
              ></div>
            </div>
            <span>{item.day}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ResponseTime
