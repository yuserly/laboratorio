<script>
import countTo from "vue-count-to";
/**
 * Stat component
 */
export default {
    components: {
        countTo
    },
    data() {
        return {
            series: [
                {
                    data: [25, 66, 41, 89, 63, 25, 44, 20, 36, 40, 54]
                }
            ],
            chartOptions: {
                fill: {
                    colors: ["#5b73e8"]
                },
                chart: {
                    type: "bar",
                    sparkline: {
                        enabled: true
                    }
                },
                plotOptions: {
                    bar: {
                        columnWidth: "50%"
                    }
                },
                labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                xaxis: {
                    crosshairs: {
                        width: 1
                    }
                },
                tooltip: {
                    fixed: {
                        enabled: false
                    },
                    x: {
                        show: false
                    },
                    y: {
                        title: {
                            formatter: function() {
                                return "";
                            }
                        }
                    },
                    marker: {
                        show: false
                    }
                }
            },
            growthChartOptions: {
                fill: {
                    colors: ["#f1b44c"]
                },
                chart: {
                    type: "bar",
                    sparkline: {
                        enabled: true
                    }
                },
                plotOptions: {
                    bar: {
                        columnWidth: "50%"
                    }
                },
                labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                xaxis: {
                    crosshairs: {
                        width: 1
                    }
                },
                tooltip: {
                    fixed: {
                        enabled: false
                    },
                    x: {
                        show: false
                    },
                    y: {
                        title: {
                            formatter: function() {
                                return "";
                            }
                        }
                    },
                    marker: {
                        show: false
                    }
                }
            },
            orderseries: [70],
            orderRadial: {
                fill: {
                    colors: ["#34c38f"]
                },
                chart: {
                    sparkline: {
                        enabled: true
                    }
                },
                dataLabels: {
                    enabled: false
                },
                plotOptions: {
                    radialBar: {
                        hollow: {
                            margin: 0,
                            size: "60%"
                        },
                        track: {
                            margin: 0
                        },
                        dataLabels: {
                            show: false
                        }
                    }
                }
            },
            customerseries: [55],
            customerRadial: {
                fill: {
                    colors: ["#5b73e8"]
                },
                chart: {
                    sparkline: {
                        enabled: true
                    }
                },
                dataLabels: {
                    enabled: false
                },
                plotOptions: {
                    radialBar: {
                        hollow: {
                            margin: 0,
                            size: "60%"
                        },
                        track: {
                            margin: 0
                        },
                        dataLabels: {
                            show: false
                        }
                    }
                }
            },
            ventayear: 0,
            ventamonth: 0,
            ventaday: 0,
            qrpendiente:0
        };
    },
    mounted() {
        this.axios.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${localStorage.getItem("token")}`;
        this.traertotal();
    },

    methods: {
        traertotal() {
            this.axios.get(`/api/totalventas/`).then(response => {
                console.log(response);
                this.ventayear = this.formatomoneda(response.data.ventayear) ;
                this.ventamonth = this.formatomoneda(response.data.ventamonth) ;
                this.ventaday = this.formatomoneda(response.data.ventaday) ;
                this.qrpendiente = response.data.qrpendiente
            });
        },

        formatomoneda(valor) {
            var formatter = new Intl.NumberFormat("es-CL", {
                style: "currency",
                currency: "CLP",
                minimumFractionDigits: 0
            });
            return formatter.format(valor);
        }
    }
};
</script>

<template>
    <div class="row">
        <div class="col-md-6 col-xl-3">
            <div class="card">
                <div class="card-body">
                    <div class="float-end mt-2">
                        <apexchart
                            class="apex-charts"
                            dir="ltr"
                            width="70"
                            height="40"
                            :options="chartOptions"
                            :series="series"
                        ></apexchart>
                    </div>
                    <div>
                        <h4 class="mb-1 mt-1">
                            <span data-plugin="counterup">
                                {{ ventayear}}
                            </span>
                        </h4>
                        <p class="text-muted mb-0">Total Anual</p>
                    </div>
                    <!-- <p class="text-muted mt-3 mb-0">
                    <span class="text-success me-1">
                        <i class="mdi mdi-arrow-up-bold me-1"></i>2.65%
                    </span>
                    since last week
                </p> -->
                </div>
            </div>
        </div>
        <div class="col-md-6 col-xl-3">
            <div class="card">
                <div class="card-body">
                    <div class="float-end mt-2">
                        <apexchart
                            class="apex-charts"
                            type="radialBar"
                            dir="ltr"
                            width="45"
                            height="45"
                            :options="orderRadial"
                            :series="orderseries"
                        ></apexchart>
                    </div>
                    <div>
                        <h4 class="mb-1 mt-1">
                            {{ ventamonth}}
                        </h4>
                        <p class="text-muted mb-0">Total mes en curso</p>
                    </div>
                    <!-- <p class="text-muted mt-3 mb-0">
                    <span class="text-danger me-1">
                        <i class="mdi mdi-arrow-down-bold me-1"></i>0.82%
                    </span>
                    since last week
                </p> -->
                </div>
            </div>
        </div>
        <!-- end col-->

        <div class="col-md-6 col-xl-3">
            <div class="card">
                <div class="card-body">
                    <div class="float-end mt-2">
                        <apexchart
                            class="apex-charts"
                            type="radialBar"
                            dir="ltr"
                            width="45"
                            height="45"
                            :options="customerRadial"
                            :series="customerseries"
                        ></apexchart>
                    </div>
                    <div>
                        <h4 class="mb-1 mt-1">
                            {{ ventaday }}
                        </h4>
                        <p class="text-muted mb-0">Total Diario</p>
                    </div>
                    <!-- <p class="text-muted mt-3 mb-0">
                    <span class="text-danger me-1">
                        <i class="mdi mdi-arrow-down-bold me-1"></i>6.24%
                    </span>
                    since last week
                </p> -->
                </div>
            </div>
        </div>
        <div class="col-md-6 col-xl-3">
        <div class="card">
            <div class="card-body">
                <div class="float-end mt-2" style="padding: 6px;font-weight: bold;font-size: 18px;border: 2px solid #000; border-radius: 5px;">
                    {{qrpendiente}}
                </div>
                <div>
                    <h4 class="mb-1 mt-1" style="font-size: 1.2rem !important;">
                        Generación QR pendiente: 
                    <router-link to="/ventas" style="font-size: 15px;font-weight: 500;color:#04a28d!important;"
                            class="side-nav-link-ref">
                            <i style="font-size: 15px;font-weight: 500;color:#04a28d!important;" class="uil-usd-square"></i><span> Ver</span>
                    </router-link>
                       
                    </h4>
                    
                </div>
                

            </div>
        </div>
    </div>
        <!-- end col-->
    </div>
    <!-- end row-->
</template>
