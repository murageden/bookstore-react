// import React, { Component } from 'react';
// import { Provider } from 'react-redux';
// import store from './store';
// import Home from './components/Home';
// import BookForm from './components/BookForm';
// import AuthorsList from './components/AuthorsList';

// export default class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       currentView: 'home' // 'home' or 'add' or authors
//     };
//     this.setView = this.setView.bind(this);
//   }

//   setView(view) {
//     this.setState({ currentView: view });
//   }

//   render() {
//     const { currentView } = this.state;

//     return (
//       <Provider store={store}>
//         <main>
//           {currentView === 'home' && <Home onViewChange={this.setView} />}
//           {currentView === 'add' && <BookForm onViewChange={this.setView} />}
//           {currentView === 'authors' && <AuthorsList onViewChange={this.setView} />}
//         </main>
//       </Provider>
//     );
//   }
// }

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { ProtectedRoute } from './components/ProtectedRoute';


import Home from './components/Home';
import BookForm from './components/BookForm';
import AuthorsList from './components/AuthorsList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/books/add" element={<BookForm />} />
          <Route path="/authors" element={<AuthorsList />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;