import React from 'react'
import { useSelector } from 'react-redux'

const Carts = () => {
  const data = useSelector(state => state.addToCart)
  console.log(data);
  return (
    <div>
      <h1>Carts</h1>
      <hr />
      <table className='table'>
        <thead>
          <tr>
            <th>id</th>
            <th>img</th>
            <th>name</th>
            <th>price</th>
            <th>quantity</th>
            <th>total</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {data.productCart.map((prod, index) => {
            return <tr key={index}>
              <td>{prod.id}</td>
              <td>{prod.image}</td>
              <td>{prod.name}</td>
              <td>{prod.price}</td>
              <td>{prod.quantity}</td>
              <td>{prod.price * prod.quantity}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Carts