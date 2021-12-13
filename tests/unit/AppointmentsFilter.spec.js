import { mount } from "@vue/test-utils";
import AppointmentsFilter from "@/components/Filters/Appointments/AppointmentsFilter";
import Checkbox from "@/components/Filters/Appointments/Checkbox";
import DateFilter from "@/components/Filters/Appointments/DateFilter";
import { cloneDeep } from "lodash";

const dateInputValue = new Date();

const propsData = {
  initPending: false,
  initCompleted: false,
  initFilterEnabled: false,
  initAppointmentDay: dateInputValue,
};

test("Click on Filter Enable/Disable checkbox emits filterChanged event with correct filter state", async () => {
  const sut = mount(AppointmentsFilter, {
    propsData,
  });

  await sut
    .find("div[class='filter-title'")
    .findComponent(Checkbox)
    .find("input")
    .trigger("click");

  const emitted = sut.emitted("filterChanged");
  expect(emitted.length).toBe(1);
  expect(emitted[0][0]).toStrictEqual({
    filterEnabled: true,
    completed: false,
    pending: false,
    appointmentDay: dateInputValue,
  });

  await sut
    .find("div[class='filter-title'")
    .findComponent(Checkbox)
    .find("input")
    .trigger("click");

  expect(emitted.length).toBe(2);
  expect(emitted[1][0]).toStrictEqual({
    filterEnabled: false,
    completed: false,
    pending: false,
    appointmentDay: dateInputValue,
  });
});

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
    propsData: { ...cloneDeep(propsData), initFilterEnabled: true },
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
    propsData: { ...cloneDeep(propsData), initFilterEnabled: true },
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
