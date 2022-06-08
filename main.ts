serial.onDataReceived(serial.delimiters(Delimiters.Hash), function () {
    CMD = serial.readUntil(serial.delimiters(Delimiters.Hash))
    if (CMD == "L1") {
        pins.digitalWritePin(DigitalPin.P4, 1)
        pins.digitalWritePin(DigitalPin.P5, 0)
    } else if (CMD == "L0") {
        pins.digitalWritePin(DigitalPin.P4, 0)
        pins.digitalWritePin(DigitalPin.P5, 1)
    } else if (CMD == "B0") {
        pins.analogWritePin(AnalogPin.P6, 0)
    } else if (CMD == "B1") {
        pins.analogWritePin(AnalogPin.P6, 100)
    } else if (CMD == "OPEN") {
        pins.servoWritePin(AnalogPin.P7, 180)
    } else if (CMD == "CLOSE") {
        pins.servoWritePin(AnalogPin.P7, 0)
    } else if (CMD == "P1") {
        pins.digitalWritePin(DigitalPin.P8, 1)
    } else if (CMD == "P0") {
        pins.digitalWritePin(DigitalPin.P8, 0)
    }
})
let Gas = 0
let CMD = ""
NPNLCD.LcdInit()
pins.digitalWritePin(DigitalPin.P5, 0)
pins.digitalWritePin(DigitalPin.P4, 0)
pins.analogWritePin(AnalogPin.P6, 0)
pins.servoWritePin(AnalogPin.P7, 0)
pins.digitalWritePin(DigitalPin.P8, 0)
basic.forever(function () {
    NPNBitKit.DHT11Read(DigitalPin.P0)
    Gas = pins.digitalReadPin(DigitalPin.P2)
    NPNLCD.ShowString("Humid:" + NPNBitKit.DHT11Hum(), 0, 1)
    NPNLCD.ShowString("Temp:" + NPNBitKit.DHT11Temp() + "*C", 0, 0)
    NPNLCD.ShowString("GAS:" + Gas, 10, 1)
    serial.writeString("!TEMP:" + NPNBitKit.DHT11Temp() + "#")
    serial.writeString("!HUMID:" + NPNBitKit.DHT11Hum() + "#")
    serial.writeString("!GAS:" + Gas + "#")
    basic.pause(5000)
})
