import React from 'react'

export const ProductConfigForm = ({ currentData }) => {
  return (
    <>
      <h3 className="margin-b">Configurar alertas del producto:</h3>
      <div className="grid-left">
        <label>
          ¿Cuanto es considerado poco stock?
          <input type="number" name="low_stock_alert" autoFocus />
        </label>
        <label>
          Medida:
          <select value={currentData.unit} disabled>
            <option value="kg">KG</option>
            <option value="lts">LTS</option>
            <option value="paquetes">PAQUETES</option>
            <option value="unidades">UNIDADES</option>
            <option value="cajas">CAJAS</option>
            <option value="bolsas">BOLSAS</option>
          </select>
        </label>
      </div>
      <label>
        ¿Cuando alertar el vencimiento?
        <select name="expiration_time_alert">
          <option value="15d">15 días antes</option>
          <option value="1m">1 mes antes</option>
          <option value="1.5m">1 mes y medio antes</option>
          <option value="2m">2 meses antes</option>
        </select>
      </label>
    </>
  )
}
