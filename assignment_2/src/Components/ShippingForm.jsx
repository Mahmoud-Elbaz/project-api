// import { useFormik } from 'formik';
// import React from 'react'

// export default function ShippingForm() {
//     // form
  
//     async function submitForm(cartId,values) {
//         let res = await checkout(cartId,values)
//         console.log(res);
//       }
    
//       let formik = useFormik({
//         initialValues: {
//           details: "",
//           phone: "",
//           city:""
//         },
//         onSubmit: submitForm,
//       });

//     return (
//     <div className='container m-5'>
//         <form onSubmit={formik.handleSubmit}>
//             <input type="text" className="form-control my-2" placeholder="Address" onChange={formik.handleChange} name="details" value={formik.values.details} />
//             <input type="tel" className="form-control my-2" placeholder="Phone" onChange={formik.handleChange} name="phone" value={formik.values.phone} />
//             <input type="text" className="form-control my-2" placeholder="City" onChange={formik.handleChange} name="city" value={formik.values.city} />
//             <button className="btn bg-main text-white" type="submit">Send</button>
//         </form>
//     </div>
//   )
// }
