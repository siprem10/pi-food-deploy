const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.


module.exports = (sequelize) => {

  /* 
    ID
    Nombre
 */

  // defino el modelo -> Dieta (Tipo de dieta)
  sequelize.define('diet', {

    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, // requerido
      unique: true,
      validate: {        
        isValidRange(value){
          if( value.length > 40 ){
            throw new Error("Name is very long!");
          }
        }
      }
    }

  },
  {
    timestamps: false
  });
};
