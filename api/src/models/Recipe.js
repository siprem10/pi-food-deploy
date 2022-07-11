const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.


module.exports = (sequelize) => {

  /* 
    ID: *
    Nombre *
    Resumen del plato *
    Nivel de "comida saludable" (health score)
    Paso a paso
 */

  // defino el modelo -> Receta
  sequelize.define('recipe', {

    id: {
      type: DataTypes.UUID, // es el id de la API
      allowNull: false, // require  *
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4 // si el usuario crea un personaje se genera un id auto
    },
    name: {
      type: DataTypes.STRING(80),
      allowNull: false, // require *
      validate: {        
        isValidRange(value){
          if( value.length > 80 ){
            throw new Error("Name very long!");
          }
        }
      } 
    },
    // Resumen de la receta
    summary: {
      type: DataTypes.STRING(1500),
      allowNull: false, // require *
      validate: {        
        isValidRange(value){
          if( value.length > 1500 ){
            throw new Error("Summary very long!");
          }
        }
      }
    },
    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      validate: {        
        isValidRange(value){
          if( !(value > 0 && value <= 100) ){
            throw new Error("HealthScore invalid!");
          }
        }
      }  
    },
    // Paso a paso (instrucciones)
    steps: {
      type: DataTypes.ARRAY(DataTypes.STRING(65535)), // es un arreglo de strings
    },
    // Guardar el path de una img
    imgUri: {
      type: DataTypes.STRING(65535),
      allowNull: false, 
      validate: {        
        isValidRange(value){
          if( value.length > 65535 ){
            throw new Error("ImgUri very long!");
          }
        }
      }
    },
  },
  {
    timestamps: false
  });
};
