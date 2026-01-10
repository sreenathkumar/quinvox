//Aggregation pipeline for statistics related to invoice model
export function getInvoiceAggregation(userId: string) {
    return [
        {
            $facet: {
                lastMonth: [
                    {
                        $match: {
                            userId,
                            $expr: {
                                $and: [
                                    {
                                        $gte: [
                                            "$createdAt",
                                            {
                                                $dateSubtract: {
                                                    startDate: {
                                                        $dateTrunc: {
                                                            date: "$$NOW",
                                                            unit: "month"
                                                        }
                                                    },
                                                    unit: "month",
                                                    amount: 1
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        $lt: [
                                            "$createdAt",
                                            {
                                                $dateTrunc: {
                                                    date: "$$NOW",
                                                    unit: "month"
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },

                        }
                    },
                    {
                        $addFields: {
                            invoice_subtotal: {
                                $sum: {
                                    $map: {
                                        input: "$items",
                                        as: "item",
                                        in: {
                                            $multiply: [
                                                "$$item.unit_price",
                                                "$$item.quantity"
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            total_billed: {
                                $sum: "$invoice_subtotal"
                            },
                            total_invoices: {
                                $sum: 1
                            }
                        }
                    },
                    {
                        $addFields: {
                            avg_value: {
                                $cond: [
                                    {
                                        $eq: ["$total_invoices", 0]
                                    },
                                    0,
                                    {
                                        $round: [
                                            {
                                                $divide: [
                                                    "$total_billed",
                                                    "$total_invoices"
                                                ]
                                            },
                                            2
                                        ]
                                    }
                                ]
                            }
                        }
                    }
                ],
                currentMonth: [
                    {
                        $match: {
                            userId,
                            $expr: {
                                $gte: [
                                    "$createdAt",
                                    {
                                        $dateTrunc: {
                                            date: "$$NOW",
                                            unit: "month"
                                        }
                                    }
                                ]
                            }
                        }
                    },
                    {
                        $addFields: {
                            invoice_subtotal: {
                                $sum: {
                                    $map: {
                                        input: "$items",
                                        as: "item",
                                        in: {
                                            $multiply: [
                                                "$$item.unit_price",
                                                "$$item.quantity"
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            total_billed: {
                                $sum: "$invoice_subtotal"
                            },
                            total_invoices: {
                                $sum: 1
                            }
                        }
                    },
                    {
                        $addFields: {
                            avg_value: {
                                $cond: [
                                    {
                                        $or: [
                                            { $eq: ["$total_invoices", 0] },
                                            { $eq: ['$total_billed', 0] }
                                        ],
                                    },
                                    0,
                                    {
                                        $round: [
                                            {
                                                $divide: [
                                                    "$total_billed",
                                                    "$total_invoices"
                                                ]
                                            },
                                            2
                                        ]
                                    }
                                ]
                            }
                        }
                    }
                ]
            }
        },
        {
            $project: {
                current: {
                    $ifNull: [
                        {
                            $arrayElemAt: ["$currentMonth", 0]
                        },
                        {
                            total_billed: 0,
                            total_invoices: 0,
                            avg_value: 0
                        }
                    ]
                },
                last: {
                    $ifNull: [
                        {
                            $arrayElemAt: ["$lastMonth", 0]
                        },
                        {
                            total_billed: 0,
                            total_invoices: 0,
                            avg_value: 0
                        }
                    ]
                }
            }
        },
        {
            $addFields: {
                billGrowth: {
                    $cond: [
                        {
                            $eq: ["$last.total_billed", 0]
                        },
                        null,
                        {
                            $cond: [
                                {
                                    $or: [
                                        { $gt: [{ $dayOfMonth: '$$NOW' }, 10] },
                                        {
                                            $gt: ["$current.total_billed", 0]
                                        }]
                                },
                                {
                                    $round: [
                                        {
                                            $multiply: [
                                                {
                                                    $divide: [
                                                        {
                                                            $subtract: [
                                                                "$current.total_billed",
                                                                "$last.total_billed"
                                                            ]
                                                        },
                                                        "$last.total_billed"
                                                    ]
                                                },
                                                100
                                            ]
                                        },
                                        2
                                    ],

                                },
                                null
                            ]
                        }
                    ]
                },
                invoiceGrowth: {
                    $cond: [
                        {
                            $eq: ["$last.total_invoices", 0]
                        },
                        null,
                        {
                            $cond: [
                                {
                                    $or: [
                                        { $gt: [{ $dayOfMonth: '$$NOW' }, 10] },
                                        { $gt: ['$current.total_invoices', 0] }
                                    ]

                                },
                                {
                                    $round: [
                                        {
                                            $multiply: [
                                                {
                                                    $divide: [
                                                        {
                                                            $subtract: [
                                                                "$current.total_invoices",
                                                                "$last.total_invoices"
                                                            ]
                                                        },
                                                        "$last.total_invoices"
                                                    ]
                                                },
                                                100
                                            ]
                                        },
                                        2
                                    ]
                                },
                                null
                            ]
                        },

                    ]
                },
                avgGrowth: {
                    $cond: [
                        {
                            $eq: ["$last.avg_value", 0]
                        },
                        null,
                        {
                            $cond: [
                                {
                                    $or: [
                                        { $gt: [{ $dayOfMonth: '$$NOW' }, 10] },
                                        {
                                            $gt: ["$current.avg_value", 0]
                                        }]
                                },
                                {
                                    $round: [
                                        {
                                            $multiply: [
                                                {
                                                    $divide: [
                                                        {
                                                            $subtract: [
                                                                "$current.avg_value",
                                                                "$last.avg_value"
                                                            ]
                                                        },
                                                        "$last.avg_value"
                                                    ]
                                                },
                                                100
                                            ]
                                        },
                                        2
                                    ],

                                },
                                null
                            ]
                        }
                    ]
                }
            }
        },
        {
            $project: {
                currentMonth: {
                    billed: {
                        $round: ["$current.total_billed", 2]
                    },
                    invoices: "$current.total_invoices",
                    avg_value: {
                        $round: ["$current.avg_value", 2]
                    }
                },
                growth: {
                    billed: "$billGrowth",
                    inovoices: "$invoiceGrowth",
                    avg_value: {
                        $round: "$avgGrowth"
                    }
                }
            }
        }
    ]
}

//Aggregation pipeline for statistics related to client model
export function getClientAggregation(userId: string) {
    return [
        {
            $facet: {
                lastMonth: [
                    {
                        $match: {
                            userId,
                            $expr: {
                                $and: [
                                    {
                                        $gte: [
                                            "createdAt",
                                            {
                                                $dateSubtract: {
                                                    startDate: {
                                                        $dateTrunc: {
                                                            date: "$$NOW",
                                                            unit: "month"
                                                        }
                                                    },
                                                    unit: "month",
                                                    amount: 1
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        $lt: [
                                            "createdAt",
                                            {
                                                $dateTrunc: {
                                                    date: "$$NOW",
                                                    unit: "month"
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                    },
                    {
                        $count: "total"
                    }
                ],
                currentMonth: [
                    {
                        $match: {
                            userId,
                            $expr: {
                                $gte: [
                                    "$createdAt",
                                    {
                                        $dateTrunc: {
                                            date: "$$NOW",
                                            unit: "month"
                                        }
                                    }
                                ]
                            }
                        }
                    },
                    {
                        $count: "total"
                    }
                ]
            }
        },
        {
            $project: {
                current: {
                    $ifNull: [
                        {
                            $arrayElemAt: [
                                "$currentMonth.total",
                                0
                            ]
                        },
                        0
                    ]
                },
                last: {
                    $ifNull: [
                        {
                            $arrayElemAt: ["$lastMonth.total", 0]
                        },
                        0
                    ]
                }
            }
        },
        {
            $addFields: {
                growth: {
                    $cond: [
                        {
                            $eq: ["$last", 0]
                        },
                        {
                            $cond: [
                                {
                                    $gt: ["$current", 0]
                                },
                                null,
                                0
                            ]
                        },
                        {
                            $multiply: [
                                {
                                    $divide: [
                                        {
                                            $subtract: [
                                                "$current",
                                                "last"
                                            ]
                                        },
                                        "$last"
                                    ]
                                },
                                100
                            ]
                        }
                    ]
                }
            }
        }
    ]
}
