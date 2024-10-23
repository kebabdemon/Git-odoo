import * as Chrome from "@point_of_sale/../tests/tours/utils/chrome_util";
import * as Dialog from "@point_of_sale/../tests/tours/utils/dialog_util";
import * as ProductScreen from "@point_of_sale/../tests/tours/utils/product_screen_util";
import * as PaymentScreen from "@point_of_sale/../tests/tours/utils/payment_screen_util";
import * as ReceiptScreen from "@point_of_sale/../tests/tours/utils/receipt_screen_util";
import { registry } from "@web/core/registry";

registry.category("web_tour.tours").add("PaymentScreenTour", {
    test: true,
    steps: () =>
        [
            Chrome.startPoS(),
            ProductScreen.addOrderline("Letter Tray", "10"),
            ProductScreen.selectedOrderlineHas("Letter Tray", "10.0"),
            ProductScreen.clickPayButton(),
            PaymentScreen.emptyPaymentlines("52.8"),

            PaymentScreen.clickPaymentMethod("Cash"),
            PaymentScreen.enterPaymentLineAmount("Cash", "11", true, {
                amount: "11.00",
                remaining: "41.8",
            }),
            PaymentScreen.validateButtonIsHighlighted(false),
            // remove the selected paymentline with multiple backspace presses
            PaymentScreen.clickNumpad("⌫ ⌫"),
            PaymentScreen.fillPaymentLineAmountMobile("Cash", "0"),
            PaymentScreen.selectedPaymentlineHas("Cash", "0.00"),
            PaymentScreen.clickPaymentlineDelButton("Cash", "0", true),
            PaymentScreen.emptyPaymentlines("52.8"),

            // Pay with bank, the selected line should have full amount
            PaymentScreen.clickPaymentMethod("Bank", true, { remaining: "0.0" }),
            PaymentScreen.validateButtonIsHighlighted(true),
            // remove the line using the delete button
            PaymentScreen.clickPaymentlineDelButton("Bank", "52.8"),

            // Use +10 and +50 to increment the amount of the paymentline
            PaymentScreen.clickPaymentMethod("Cash"),
            PaymentScreen.clickNumpad("+10"),
            PaymentScreen.fillPaymentLineAmountMobile("Cash", "10"),
            PaymentScreen.remainingIs("42.8"),
            PaymentScreen.validateButtonIsHighlighted(false),
            PaymentScreen.clickNumpad("+50"),
            PaymentScreen.fillPaymentLineAmountMobile("Cash", "60"),
            PaymentScreen.changeIs("7.2"),
            PaymentScreen.validateButtonIsHighlighted(true),
            PaymentScreen.clickPaymentlineDelButton("Cash", "60.0"),

            // Multiple paymentlines
            PaymentScreen.clickPaymentMethod("Cash"),
            PaymentScreen.clickNumpad("1"),
            PaymentScreen.fillPaymentLineAmountMobile("Cash", "1"),
            PaymentScreen.remainingIs("51.8"),
            PaymentScreen.validateButtonIsHighlighted(false),
            PaymentScreen.clickPaymentMethod("Bank"),
            PaymentScreen.fillPaymentLineAmountMobile("Bank", "5"),
            PaymentScreen.clickNumpad("5"),
            PaymentScreen.remainingIs("46.8"),
            PaymentScreen.validateButtonIsHighlighted(false),
            PaymentScreen.clickPaymentMethod("Bank", true, { remaining: "0.0" }),
            PaymentScreen.validateButtonIsHighlighted(true),
        ].flat(),
});

registry.category("web_tour.tours").add("PaymentScreenTour2", {
    test: true,
    steps: () =>
        [
            Chrome.startPoS(),
            ProductScreen.addOrderline("Letter Tray", "1", "10"),
            ProductScreen.clickPayButton(),

            // check that ship later button is present
            { trigger: ".payment-buttons button:contains('Ship Later')" },

            PaymentScreen.enterPaymentLineAmount("Bank", "99"),
            // trying to put 99 as an amount should throw an error. We thus confirm the dialog.
            Dialog.confirm(),
            PaymentScreen.remainingIs("0.0"),
        ].flat(),
});

registry.category("web_tour.tours").add("PaymentScreenRoundingUp", {
    test: true,
    steps: () =>
        [
            Chrome.startPoS(),
            Dialog.confirm("Open Register"),
            ProductScreen.addOrderline("Product Test", "1"),
            ProductScreen.clickPayButton(),

            PaymentScreen.totalIs("2.00"),
            PaymentScreen.clickPaymentMethod("Cash", true, { remaining: "0.0" }),

            Chrome.clickMenuOption("Orders"),
            Chrome.createFloatingOrder(),

            ProductScreen.addOrderline("Product Test", "-1"),
            ProductScreen.clickPayButton(),

            PaymentScreen.totalIs("-2.00"),
            PaymentScreen.clickPaymentMethod("Cash", true, { remaining: "0.0" }),
        ].flat(),
});

registry.category("web_tour.tours").add("PaymentScreenRoundingDown", {
    test: true,
    steps: () =>
        [
            Chrome.startPoS(),
            Dialog.confirm("Open Register"),
            ProductScreen.addOrderline("Product Test", "1"),
            ProductScreen.clickPayButton(),

            PaymentScreen.totalIs("1.95"),
            PaymentScreen.clickPaymentMethod("Cash", true, { remaining: "0.0" }),

            Chrome.clickMenuOption("Orders"),
            Chrome.createFloatingOrder(),

            ProductScreen.addOrderline("Product Test", "-1"),
            ProductScreen.clickPayButton(),

            PaymentScreen.totalIs("-1.95"),
            PaymentScreen.clickPaymentMethod("Cash", true, { remaining: "0.0" }),
        ].flat(),
});

registry.category("web_tour.tours").add("PaymentScreenRoundingHalfUp", {
    test: true,
    steps: () =>
        [
            Chrome.startPoS(),
            Dialog.confirm("Open Register"),
            ProductScreen.addOrderline("Product Test 1.2", "1"),
            ProductScreen.clickPayButton(),

            PaymentScreen.totalIs("1.00"),
            PaymentScreen.clickPaymentMethod("Cash", true, { remaining: "0.0" }),

            Chrome.clickMenuOption("Orders"),
            Chrome.createFloatingOrder(),

            ProductScreen.addOrderline("Product Test 1.25", "1"),
            ProductScreen.clickPayButton(),

            PaymentScreen.totalIs("1.5"),
            PaymentScreen.clickPaymentMethod("Cash", true, { remaining: "0.0" }),

            Chrome.clickMenuOption("Orders"),
            Chrome.createFloatingOrder(),

            ProductScreen.addOrderline("Product Test 1.4", "1"),
            ProductScreen.clickPayButton(),

            PaymentScreen.totalIs("1.5"),
            PaymentScreen.clickPaymentMethod("Cash", true, { remaining: "0.0" }),

            Chrome.clickMenuOption("Orders"),
            Chrome.createFloatingOrder(),

            ProductScreen.addOrderline("Product Test 1.2", "1"),
            ProductScreen.clickPayButton(),

            PaymentScreen.totalIs("1.00"),
            PaymentScreen.clickPaymentMethod("Cash"),
            PaymentScreen.clickNumpad("2"),
            PaymentScreen.fillPaymentLineAmountMobile("Cash", "2"),

            PaymentScreen.changeIs("1.0"),
        ].flat(),
});

registry.category("web_tour.tours").add("PaymentScreenRoundingHalfUpCashAndBank", {
    test: true,
    steps: () =>
        [
            Chrome.startPoS(),
            Dialog.confirm("Open Register"),
            ProductScreen.addOrderline("Product Test 40", "1"),
            ProductScreen.clickPartnerButton(),
            ProductScreen.clickCustomer("Partner Test 1"),
            ProductScreen.clickPayButton(),

            PaymentScreen.totalIs("40.00"),
            PaymentScreen.clickPaymentMethod("Bank"),
            PaymentScreen.clickNumpad("3 8"),
            PaymentScreen.fillPaymentLineAmountMobile("Bank", "38"),
            PaymentScreen.remainingIs("2.0"),
            PaymentScreen.clickPaymentMethod("Cash", true, { remaining: "0.0" }),

            PaymentScreen.clickInvoiceButton(),
            PaymentScreen.clickValidate(),
            ReceiptScreen.receiptIsThere(),
            ReceiptScreen.clickNextOrder(),

            ProductScreen.addOrderline("Product Test 41", "1"),
            ProductScreen.clickPartnerButton(),
            ProductScreen.clickCustomer("Partner Test 1"),
            ProductScreen.clickPayButton(),

            PaymentScreen.totalIs("41.00"),
            PaymentScreen.clickPaymentMethod("Bank"),
            PaymentScreen.clickNumpad("3 8"),
            PaymentScreen.fillPaymentLineAmountMobile("Bank", "38"),
            PaymentScreen.remainingIs("3.0"),
            PaymentScreen.clickPaymentMethod("Cash", true, { remaining: "0.0" }),

            PaymentScreen.clickInvoiceButton(),
            PaymentScreen.clickValidate(),
            ReceiptScreen.receiptIsThere(),
        ].flat(),
});

registry.category("web_tour.tours").add("PaymentScreenTotalDueWithOverPayment", {
    test: true,
    steps: () =>
        [
            Chrome.startPoS(),
            ProductScreen.addOrderline("Product Test", "1"),
            ProductScreen.clickPayButton(),

            PaymentScreen.totalIs("1.95"),
            PaymentScreen.clickPaymentMethod("Cash"),
            PaymentScreen.enterPaymentLineAmount("Cash", "5", true, {
                change: "3.05",
            }),
            PaymentScreen.totalIs("1.95"),
        ].flat(),
});

registry.category("web_tour.tours").add("InvoiceShipLaterAccessRight", {
    test: true,
    steps: () =>
        [
            Chrome.startPoS(),
            ProductScreen.confirmOpeningPopup(),
            ProductScreen.clickHomeCategory(),
            ProductScreen.addOrderline("Whiteboard Pen", "1"),
            ProductScreen.clickPartnerButton(),
            ProductScreen.clickCustomer("Deco Addict"),
            ProductScreen.clickPayButton(),

            PaymentScreen.clickPaymentMethod("Cash"),
            PaymentScreen.clickShipLaterButton(),
            PaymentScreen.clickValidate(),
        ].flat(),
});

registry.category("web_tour.tours").add("CashRoundingPayment", {
    test: true,
    steps: () =>
        [
            Chrome.startPoS(),
            Dialog.confirm("Open Register"),
            ProductScreen.addOrderline("Magnetic Board", "1"),
            ProductScreen.clickPayButton(),

            // Check the popup error is shown when selecting another payment method
            PaymentScreen.totalIs("1.90"),
            PaymentScreen.clickPaymentMethod("Cash"),
            PaymentScreen.enterPaymentLineAmount("Cash", "1.94"),
            PaymentScreen.clickValidate(),
            Dialog.is(),
        ].flat(),
});
