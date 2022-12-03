import {
    reactive
} from 'vue';

export const useDashboard = () => {
    const durationList = reactive([{
        name: 'Today',
        key: 'today',
        isSelected: true
    }, {
        name: 'Week',
        key: 'week'
    }, {
        name: 'Month',
        key: 'month'
    }, {
        name: 'Year',
        key: 'Year'
    }]);


    // In case of a range picker, you'll receive [Date, Date]
    const formatDateRange = (date) => {
        if (date && Array.isArray(date)) {
            let stateDate = date[0];
            let endDate = date[1];

            return `${stateDate?.getDate()}/${stateDate?.getMonth() + 1}/${stateDate.getFullYear()}` +
                ' - ' + `${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}`
        }
    }
    // In case of a range picker, you'll receive [Date, Date]
    const formatPreviewDateRange = (date) => {
        if (date && Array.isArray(date)) {
            let stateDate = date[0];
            let endDate = date[1] || stateDate;

            return `${stateDate?.getDate()}/${stateDate?.getMonth() + 1}/${stateDate?.getFullYear()}` +
                '   ' + `${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate?.getFullYear()}`;
        }
    }

    const customSummaryInformationObject = [{
        iconClass: "icon24-dashboard revenue",
        class: "revenue",
        value: "120.000.000",
        name: "Revenue"
    }, {
        iconClass: "icon24-dashboard expense",
        class: "expense",
        value: "120.000.000",
        name: "Expense"
    }, {
        iconClass: "icon24-dashboard order",
        class: "order",
        value: "120",
        name: "Order"
    }, {
        iconClass: "icon24-dashboard customer",
        class: "customer",
        value: "120",
        name: "Customer"
    }];

    const customSummaryDetailInformationObject = [{
            name: 'Avg Sales',
            iconClass: 'icon24-dashboard-summary avg-sale',
            value: "17.000.000",
            key: 'avg-sale'
        },
        {
            name: 'Avg Item Sales',
            iconClass: 'icon24-dashboard-summary item-sale',
            value: '152',
            key: 'avg-item-sale'
        },
        {
            name: 'Total Sales',
            iconClass: 'icon24-dashboard-summary total-sale',
            value: '36.852.000',
            key : 'total-sale',
        },
        {
            name: 'Visitors',
            iconClass: 'icon24-dashboard-summary visitor',
            value: '152',
            key: 'visitor',
        }, {
            name: 'Total Products',
            iconClass: 'icon24-dashboard-summary product',
            value: '152',
            key: 'total-product',
        },{
            name : 'Total Transactions',
            iconClass: 'icon24-dashboard-summary sell-item',
            value: '5',
            key: 'total-transaction',
        }
    ];

    return {
        durationList,
        formatDateRange,
        formatPreviewDateRange,
        customSummaryInformationObject,
        customSummaryDetailInformationObject
    }
}