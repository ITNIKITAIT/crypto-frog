export type ProfileProps = {
  id: number;
  email: string;
  banned: boolean;
};

export type AddProfileProps = Omit<ProfileProps, "id">;

export type ProfileCardProps = {
  id: number;
  email: string;
  numberOfOrders: number;
  totalCostOfOrders: number;
  hasDiscount: boolean;
  discount: null | number;
  banned: boolean;
};

/*
  API для создания юзера нет
  Когда пользователь делает заказ, он вводит свой email
  У него автоматически при заказе создается профиль, если его нет, то он автоматически заказывает с этого профиля

  Так же, юзер может логиниться и такого профиля нет, то автоматически создается новый пользователь

  Если есть, то не создается,

  НУЖНО ЛИ СОЗДАВАТЬ ВХОД В ПРОФИЛЬ?! 


*/

/*
  Создание пользователя

  1. Когда пользователь логинится, сначала отправляется запрос UserToken
  2. После этого пользователю на почту приходит письмо

  Уважаемый пользователь,
--------------------------------
  Ваша ссылка для входа в систему: http://localhost:8080/login?email=tbgaripov@gmail.com&sessionId=d77de21c-3c7c-4e41-a14a-e09ef2334d7a

  С уважением,
  Команда Rocket Farm Shop
--------------------------------

3. Пользователь открывает ссылку в письме 

http://localhost:8080/login?email=tbgaripov@gmail.com&sessionId=d77de21c-3c7c-4e41-a14a-e09ef2334d7a

Создать страницу, на которой происходит процедура логина. На странице может быть просто информация "Вы залогинены". После чего sessionId и email записывается в localStorage



http://138.68.109.236:8080/api/admin/profile/user@test.com

У каждого пользователя есть профиль, 

{
	"id": 2,
	"email": "user@test.com",
	"numberOfOrders": 0,
	"totalCostOfOrders": 0.0,
	"hasDiscount": false,
	"discount": 0,
	"banned": false
}

  Эти данные может видеть только админ 

  Реальные действия: Забанить или добавить скидку

  "Добавить скидку" - это  hasDiscount = true, discount = (проценты)
*/

export type UserRole = "ROLE_ADMIN" | "ROLE_USER";

export type AdminSignInProps = {
  token: string;
  user: {
    id: number;
    login: string;
    role: UserRole;
  };
};
