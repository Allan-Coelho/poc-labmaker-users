![labmaker logo](https://user-images.githubusercontent.com/63244077/201710991-a90b24d8-56a4-46a1-9c8b-7ef7077475e8.gif)


# Usuários do Labmaker

<p>Essa API foi feita para gerenciar os usuários que interagem com o Labmaker da USP São Carlos.<p/>

## Rotas
 - *POST* `/users/sign-up`: Registra o usuário com Papel e Permissão padrão.

  ```
  {
    "name": "Example Example",
    "personal_email": "example@gmail.com",
    "institutional_email": "example@usp.br",
    "phone": "11123123123",
    "cep": "12345-678",
    "address_number": "1",
    "address_additional_information": "apto 123",
    "institutional_id": "123456789"
  }
  ```
  - *PUT* `/users/permissions`: Atualiza a permissão do usuário.<br>
  ```
  {
    "permission_id": 3,
    "user_id": 5
}
  ```
  - *DELETE* `/users/:id`: Delete um usuário com base no id.<br>
  - *GET* `/users/:id`: Retorna os dados de um usuário com base no id.<br>
  - *GET* `/users?search_name=`: Pesquisa usuários através do nome.<br>
  - *GET* `/users/count`: Retorna a quantidade de usuários cadastrados no laboratório.<br>
