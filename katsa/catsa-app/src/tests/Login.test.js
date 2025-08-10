import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router, Routes, Route, MemoryRouter } from "react-router-dom";

import Login from "../componets/Login";
       
const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

test("username input should be rendered", ()=>{
    render(

        <MemoryRouter>
            <Login />
        </MemoryRouter>
    )
    const usernameInputEl = screen.getByPlaceholderText(/username/i);
    expect(usernameInputEl).toBeInTheDocument();
});


test("id input should be rendered", ()=>{
    render(
   
        <MemoryRouter>
            <Login />
        </MemoryRouter>
    )
    const idInputEl = screen.getByPlaceholderText(/id/i);
    expect(idInputEl).toBeInTheDocument();
});

test("button should be rendered", ()=>{
    render(
   
        <MemoryRouter>
            <Login />
        </MemoryRouter>
    )
    const ButtonEl = screen.getByRole('button');
    expect(ButtonEl).toBeInTheDocument();
});


test("username input should be empty", ()=>{
    render(

        <MemoryRouter>
            <Login />
        </MemoryRouter>
    )
    const usernameInputEl = screen.getByPlaceholderText(/username/i);
    expect(usernameInputEl.value).toBe("");
});
test("id input should be empty", ()=>{
    render(

        <MemoryRouter>
            <Login />
        </MemoryRouter>
    )
    const idInputEl = screen.getByPlaceholderText(/id/i);
    expect(idInputEl.value).toBe("");
});
test("username input should change", ()=>{
    render(

        <MemoryRouter>
            <Login />
        </MemoryRouter>
    )
      

    const usernameInputEl = screen.getByPlaceholderText(/username/i);
    const testValue = "test"
    fireEvent.change(usernameInputEl, { target: {value: testValue}})
    expect(usernameInputEl.value).toBe(testValue);
});
test("id input should change", ()=>{
    render(

        <MemoryRouter>
            <Login />
        </MemoryRouter>
    )
      

    const IdInputEl = screen.getByPlaceholderText(/id/i);
    const testValue = "test"
    fireEvent.change(IdInputEl, { target: {value: testValue}})
    expect(IdInputEl.value).toBe(testValue);
});


// test("button  should be disabled", ()=>{
//     render(

//         <MemoryRouter>
//             <Login />
//         </MemoryRouter>
//     )
      

//     const buttonEl = screen.getByRole("button")
//     expect(buttonEl).toBeDisabled();
// });



// test("error message should not be visable",  ()=>{
//     render(

//         <MemoryRouter>
//             <Login />
//         </MemoryRouter>
//     )
     
//         const errorEl = screen.queryByTestId("error1")
    
//     waitFor(()=>expect(errorEl).not.toBeVisible());
    
//  //   console.log(screen.debug(null,Infinity))    
    
// });



test("error message", async ()=>{
    render(

        <MemoryRouter>
            <Login />
        </MemoryRouter>
    )
        const IdInputEl = screen.getByPlaceholderText(/id/i);
        const testValue = "test"
        fireEvent.change(IdInputEl, { target: {value: testValue}})
        // expect(IdInputEl.value).toBe(testValue);
        
        
        const usernameInputEl = screen.getByPlaceholderText(/username/i);
   
        fireEvent.change(usernameInputEl, { target: {value: testValue}})
       

       
        const buttonEl = screen.getByTestId('login-btn')
        fireEvent.click(buttonEl)
        
        await delay(500)
        const errorEl = screen.getByTestId("error1")
        //await delay(500)
        console.log(errorEl)

       expect(errorEl).toBeVisible()



  //  waitFor(()=>expect(errorEl.value)==null);
    
 //   console.log(screen.debug(null,Infinity))    
    
});

// test("error message should not be visable", ()=>{
//     render(

//         <MemoryRouter>
//             <Login />
//         </MemoryRouter>
//     )
      
        
    
//     expect(screen.queryByTestId('error1')).toBeDefined()
// });