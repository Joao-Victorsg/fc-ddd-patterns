import CustomerChangeAddressEvent from "../../customer/event/customer-change-address.event";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import SendConsoleLog1Handler from "../../customer/event/handler/send-console-log-1.handler";
import SendConsoleLog2Handler from "../../customer/event/handler/send-console-log-2.handler";
import SendConsoleLogHandler from "../../customer/event/handler/send-console-log.handler";
import Address from "../../customer/value-object/address";
import EventDispatcher from "./event-dispatcher";

describe("Customer events tests", () => {
    it('should notify all handlers when a customer is created', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new SendConsoleLog1Handler();
        const eventHandler2 = new SendConsoleLog2Handler();

        const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        const customerCreatedEvent = new CustomerCreatedEvent({
            name: "Customer",
        });

        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
    });

    it('should notify all handlers when a address is change', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLogHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("CustomerChangeAddressEvent", eventHandler);

        const newAddress = new Address('Street 1', 123, '00000-000', 'São Paulo')

        const addressChangedEvent = new CustomerChangeAddressEvent({
            id: "123",
            name: "Customer 1",
            address: newAddress.toString()
        });

        eventDispatcher.notify(addressChangedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    });

})