import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import isReact from 'is-react';

import * as data from '../db.json';
import * as actions from '../src/redux/actions';

import LandingPage from "../components/LandingPage/LandingPage.jsx"

configure({ adapter: new Adapter() });

describe('<LandingPage/>', () => {

   beforeAll(() => expect(isReact.classComponent(CreateProduct)).toBeFalsy());

   describe('Formulario de creación de producto', () => {
      let createProduct;

      it('Debe renderizar un formulario', () => {
         expect(createProduct.find('form').length).toBe(1);
      });

      it('Debe renderizar un label para el nombre con el texto "Name: "', () => {
         expect(createProduct.find('label').at(0).text()).toEqual('Name: ');
      });

      it('Debe renderizar un input para con la propiedad "name" igual a "name', () => {
         expect(createProduct.find('input[name="name"]').length).toBe(1);
      });

      it('Debe renderizar un label para el precio con el texto "Price:', () => {
         expect(createProduct.find('label').at(1).text()).toBe('Price: ');
      });

      it('Debe renderizar un input de tipo number para con la propiedad "name" igual a "price"', () => {
         expect(createProduct.find('input[name="price"]').length).toBe(1);
         expect(createProduct.find('input[type="number"]').length).toBe(2);
      });
      it('Debe renderizar un label para la descripción con el texto "Description:', () => {
         expect(createProduct.find('label').at(2).text()).toBe('Description: ');
      });
      it('Debe renderizar un textarea con la propiedad name igual a "description"', () => {
         expect(createProduct.find('textarea[name="description"]').length).toBe(
            1,
         );
      });

      it('Debe renderizar in label para el stock con el texto "Stock: "', () => {
         expect(createProduct.find('label').at(3).text()).toEqual('Stock: ');
      });
      it('Debe renderizar un input de tipo number para con la propiedad "name" igual a "stock', () => {
         expect(createProduct.find('input[name="stock"]').length).toBe(1);
         expect(createProduct.find('input[type="number"]').length).toBe(2);
      });

      it('Debería renderizar un input de button submit y con texto "Create Product"', () => {
         expect(createProduct.find('button[type="submit"]').length).toBe(1);
         expect(createProduct.find('button[type="submit"]').text()).toBe(
            'Create Product',
         );
      });
   });


      it('Debe evitar que se refresque la página luego de hacer submit con el uso del evento "preventDefault"', () => {
         const event = { preventDefault: () => {} };
         jest.spyOn(event, 'preventDefault');
         createProduct.find('form').simulate('submit', event);
         expect(event.preventDefault).toBeCalled();
      });
});


/* import React from "react";
import { Link } from "react-router-dom";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import isReact from "is-react";

import LandingPage from "../components/LandingPage/LandingPage.jsx"

configure({ adapter: new Adapter() });

describe("<LadingPage />", () => {
  let nav;
 
  beforeEach(() => {
    nav = shallow(<Nav />);
    expect(isReact.classComponent(LandingPage)).toBeTruthy();
  });

  it('Debería renderizar dos <Link to="" />. El primero que vaya a "/", y el segundo a "/products/create"', () => {
    // Podes importar el componente Link de react-router-dom.
        expect(nav.find(Link).length).toBeGreaterThanOrEqual(2);
    expect(nav.find(Link).at(0).prop('to')).toEqual('/');
    expect(nav.find(Link).at(1).prop('to')).toEqual('/products/create');
  });

  it('Debería tener un Link con el texto "Home" que cambie la ruta hacia "/"', () => {
    // El orden en el que se declaran los Links es importante!
    expect(nav.find(Link).at(0).prop("to")).toEqual("/");
    expect(nav.find(Link).at(0).text()).toEqual("Home");
  });

  it('Debería tener un segundo Link, con texto "Create Product" y que cambie la ruta hacia "/product/create"', () => {
    expect(nav.find(Link).at(1).prop("to")).toEqual("/products/create");
    expect(nav.find(Link).at(1).text()).toEqual("Create Product");
  });
}); */
