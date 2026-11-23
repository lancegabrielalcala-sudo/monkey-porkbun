const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0
});

document.querySelectorAll('.fade-down').forEach((element) => {
    observer.observe(element);
});

/* animation */

const ctx = document.getElementById('myChart');

if (ctx && window.Chart) {
    const chartObserver = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Unemployment', 'Underemployment'],
                    datasets: [{
                        label: 'Rate',
                        data: [5.4, 11.0],
                        backgroundColor: ['#2d8060', '#f4b942'],
                        borderRadius: 6,
                        borderSkipped: false
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                label: (context) => `${context.parsed.y}%`
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            suggestedMax: 12,
                            grid: { color: '#edf1ee' },
                            ticks: { color: '#64736b' }
                        },
                        x: {
                            grid: { display: false },
                            ticks: { color: '#64736b', maxRotation: 20 }
                        }
                    }
                }
            });
            chartObserver.disconnect();
        }
    });

    chartObserver.observe(ctx);
}
