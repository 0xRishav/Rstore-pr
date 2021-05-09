// import { createServer, Model, RestSerializer } from "miragejs";
// import faker from "faker";
// import { initialData } from "./data";

// faker.seed(123);

// export default function setupMockServer() {
//   createServer({
//     serializers: {
//       application: RestSerializer,
//     },

//     models: {
//       product: Model,
//     },

//     routes() {
//       this.namespace = "api";
//       this.timing = 3000;
//       this.resource("products");
//     },

//     seeds(server) {
//       [...initialData].forEach(
//         ({
//           id,
//           name,
//           brand,
//           category,
//           images,
//           about,
//           price,
//           rating,
//           isInStock,
//         }) => {
//           server.create("product", {
//             id,
//             name,
//             brand,
//             category,

//             image: images,
//             about,

//             price,
//             rating,
//             isInStock,
//             description: faker.commerce.productDescription(),
//             isInCart: false,
//             isInWishlist: false,
//             fastDelivery: faker.random.boolean(),
//             freeShipping: faker.random.boolean(),
//             quantity: 1,
//           });
//         }
//       );
//     },
//   });
// }
