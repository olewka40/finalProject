    export const calcTotalPrice = list =>
        data.list.reduce((total, item) => {
            return total + item.price * item.pieces;
        }, 0);