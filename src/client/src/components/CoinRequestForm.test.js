import React from 'react';
import ReactDOM from 'react-dom';
import CoinRequestForm from './CoinRequestForm';
import mockCoinDispenserClient from '../services/CoinDispenserClient';
import { mount, shallow } from 'enzyme';

jest.mock('../services/CoinDispenserClient');

describe('CoinRequestForm', () => {

  describe('initial state', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = shallow(<CoinRequestForm />).find("div.RequestForm");
    });

    it("renders the form", () => {
      expect(wrapper.length).toBeGreaterThan(0);
    });

    it("does not render results initially", () => {
      expect(wrapper.find('div.FormResult').exists()).toBe(false);
    });

    it("does not render loader", () => {
      expect(wrapper.find('img.Spinner').exists()).toBe(false);
    });
  });

  describe('form submission', () => {
    let wrapper;
    beforeAll(() => {
      mockSuccessResponse();
      wrapper = mount(<CoinRequestForm />);
    });

    it("expect to be loading", () => {
      wrapper.find('input.SubmitInput').simulate('submit');
      expect(wrapper.find('img.Spinner').exists()).toBe(true);
    });

    it("expect to render result", async () => {
      await wrapper.find('form').simulate('submit');
      wrapper.update();
      expect(wrapper.find('div.FormResult').exists()).toBe(true);
    });

    const mockSuccessResponse = () => {
      mockCoinDispenserClient.transfer = jest.fn(
        () => Promise.resolve({
          data: {
            id: "id",
            amount: "1000"
          },
          status: 201
        })
      );
    };
  });
});
