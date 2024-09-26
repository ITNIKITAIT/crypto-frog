export type DiscountProps = {
  id: number;
  userId: number;
  amount: number; // Сумма скидки (в процентах 1 - 100)
};

export type AddDiscountProps = { code: string; amount: number };

/*

post apiAdminDiscount
{
	"id": 1,
	"userId": 3,
	"code": "TFEGPH6OXW",
	"amount": 10
}

code: купон на скидку

Уважаемый пользователь,

Мы рады сообщить вам, что вы получили купон на скидку в нашем магазине в размере 10% от стоимости покупки.

Ваш промокод: TFEGPH6OXW

С уважением,
Команда Rocket Farm Shop

Это просто пришло на почту, с этим на фронте делать ничего не нужно
*/
