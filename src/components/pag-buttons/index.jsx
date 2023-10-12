// import React, { useState } from 'react'

// const RenderPaginationButtons = ({currentPage, totalPages}) => {

//     const [buttons, setButtons] = useState([])
//     for (let i = 1; i <= totalPages; i++) {
//         setButtons((prev)=> [...prev,])
//       buttons.push(i);
//     }
  
//     console.log(buttons);
//     return (
//       <div className='buttons'>
      
//         {buttons.map((button) => (
//           <button
//             key={button}
//             onClick={() => handleClick(button)}
//             className={`${button == currentPage ? "active" : ""}`}
//           >
//             {button}
//           </button>
//         ))}
//       </div>
//     );
// }

// export default RenderPaginationButtons
