import { mount } from "@vue/test-utils";
import AppointmentsFilter from "@/components/Filters/Appointments/AppointmentsFilter";
import DateFilter from "@/components/Filters/Appointments/DateFilter";
import { cloneDeep } from 'lodash';

const dateInputValue = new Date();

const propsData =  {
  initPending: false,
  initCompleted: false,
  initFilterEnabled: false,
  initAppointmentDay: dateInputValue
}

test("AppointmentsFilter is not shown if filter enable prop is false", () => {
  const sut = mount(AppointmentsFilter, {
    propsData,
  });
  const div = sut.find(".filter-container");
  expect(div).toBeDefined();
  expect(div.element.style.display).toBe("none");
});

test("AppointmentsFilter is shown if filter enable prop is true", () => {
  const sut = mount(AppointmentsFilter, {
    propsData: {...cloneDeep(propsData), initFilterEnabled: true},
  });
  const div = sut.find(".filter-container");
  expect(div).toBeDefined();
  expect(div.element.style.display).toBe("");
  expect(sut.findComponent(DateFilter).exists()).toBe(true);
  expect(sut.findComponent(DateFilter).props("initDate")).toEqual(
    dateInputValue
  );
});

test("Apply click emit filterChanged event with filter details", async () => {
  const sut = mount(AppointmentsFilter, {
    propsData: {...cloneDeep(propsData), initFilterEnabled: true},
  });
  const div = sut.find(".filter-container");
  expect(div).toBeDefined();
  expect(sut.find("button").exists()).toBe(true);
  await sut.find("button").trigger("click");
  const emitted = sut.emitted("filterChanged");
  expect(emitted.length).toBe(1);
  expect(emitted[0][0]).toEqual({
    filterEnabled: true,
    completed: false,
    pending: false,
    appointmentDay: dateInputValue,
  });
});
