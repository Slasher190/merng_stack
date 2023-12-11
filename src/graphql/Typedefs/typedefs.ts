export default `#graphql
    type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }

  type User {
    id: String!
    email: String!
    password: String!
    address: Address!
    profilePic: Image!
    Cart: [Cart!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Address {
    id: String!
    street: String!
    zipcode: String!
    houseNumber: String!
    location: String!
  }

  type Image {
    id: String!
    publicId: String!
    publicUri: String!
  }

  type Cart {
    id: String!
    quantity: Int!
    product: Product!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Product {
    id: String!
    name: String!
    description: String!
    price: Float!
    stock: Int!
    images: [Image!]!
    Category: Category
    inCart: [Cart!]!
    createdAt: DateTime!
    updatedAt: DateTime!
    createdBy: Admin!
  }

  type Category {
    id: String!
    name: String!
  }

  type Admin {
    id: String!
    email: String!
    password: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    Product: [Product!]!
  }

  type DateTime {
    value: String!
  }

  type Mutation {
    registerUser(input: RegisterUserInput!): User!
  }

  input RegisterUserInput {
    email: String!
    password: String!
    street: String!
    zipcode: String!
    houseNumber: String!
    location: String!
  }

`;
