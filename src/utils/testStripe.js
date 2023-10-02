import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51NworTIamvwN9XVUOROW2KekjqXq8JjSZENPuI9WKEuJ4HWyscjw1G6ZXh8MAPKy9nVXQlFlgak49n8XXJcb5G2F00ucmpwsQE');
const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });
  
      if (error) {
        console.error(error);
      } else {
        // Aquí puedes enviar el paymentMethod a tu servidor para completar la transacción
        console.log(paymentMethod);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit">
          Comprar
        </button>
      </form>
    );
  };
  
  const App = () => {
    return (
      <div className="App">
        {/* Renderiza tu Navbar aquí */}
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    );
  };
  
