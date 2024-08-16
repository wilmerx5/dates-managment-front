export const  formatMoney=(amount)=>{

    return Number(amount).toLocaleString('en-US',{
        style:'currency',
        currency:'COP'
    })
}