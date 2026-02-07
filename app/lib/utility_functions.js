export const utils = {
    totalcalculator(items){
        let total = 0;
        items.forEach(item => {
            total+=(item.priceSnapshot*item.quantity)
        });
        let tax = total*0.08
        return total+tax;
    },
    ItemsOptimizer(items){
        let returnable = []
        items.forEach(item => {
            returnable.push({"productId":item.productId,"quantity":item.quantity,"priceSnapshot":item.priceSnapshot})
        })
        return returnable
    }
}