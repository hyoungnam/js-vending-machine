import { ACTIONS, ERROR_MESSAGES, VIEWS } from '../constants.js'
import { $ } from '../utils/selector.js'
import View from './View.js'

export default class ProductInventory extends View {
  constructor(app, props) {
    super(app, props)
    this.render()
    this.bindEvent()
  }
  bindEvent = () => {
    this.$app.addEventListener('submit', (e) => {
      e.preventDefault()
      if (e.target.id !== 'product-form') return

      const formData = new FormData($('#product-form'))
      const name = formData.get('name')
      const price = parseInt(formData.get('price'))
      const quantity = parseInt(formData.get('quantity'))

      if (price % 10 !== 0) {
        alert(ERROR_MESSAGES.INVALID_PRODUCT_PRICE)
        return
      }
      this.props.setState({ type: ACTIONS.ADD_PRODUCT, payload: { name, price, quantity } })
    })
  }

  template = () => {
    const { products } = this.props.getState()

    return `<h3>상품 추가하기</h3>
    <div class="product-container">
      <form id="product-form">
      <input type="text" name="name" id="product-name-input" placeholder="상품명" required/>
      <input type="number" name="price" id="product-price-input" placeholder="가격" min="100" required/>
      <input type="number" name="quantity" id="product-quantity-input" placeholder="수량" min="1" required/>
      <button id="product-add-button">추가하기</button>
      </form>
    </div>
    <table class="product-inventory">
      <colgroup>
        <col style="width: 140px" />
        <col style="width: 100px" />
        <col style="width: 100px" />
      </colgroup>
      <thead>
        <tr>
          <th>상품명</th>
          <th>가격</th>
          <th>수량</th>
        </tr>
      </thead>
      <tbody id="product-inventory-container">
        ${
          products.length !== 0
            ? products
                .map(({ name, price, quantity }) => {
                  return `<tr>
			              <td>${name}</td>
			              <td>${price}</td>
			              <td>${quantity}</td>
		              </tr>`
                })
                .join('')
            : ''
        }
      </tbody>

    </table>`
  }
}
