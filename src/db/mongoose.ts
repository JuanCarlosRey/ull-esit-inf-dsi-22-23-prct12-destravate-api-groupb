/**
 * Conecta a un servidor de base de datos MongoDB.
 * @param uri - La URL del servidor de base de datos MongoDB.
 * @returns Una promesa que se resuelve con nada si la conexión es exitosa.
 * @throws Si la conexión no puede establecerse o hay un error en la conexión.
 */
declare function connect(uri: string): Promise<void>;

/**
 * Intenta conectarse a un servidor de base de datos MongoDB que se ejecuta localmente.
 */
try {
  await connect("mongodb://127.0.0.1:27017/sports-app");
  console.log("Connection to MongoDB server established");
} catch (error) {
  console.log("Unable to connect to MongoDB server");
}
