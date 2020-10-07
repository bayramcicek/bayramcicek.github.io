---
layout: post
title:  "Android Bluetooth Low Energy - BLE"
date:   2020-10-07 12:01:12 +0300
categories: general
---

Bluetooth Low Energy (BLE) (Bluetooth Düşük Enerji), yakın cihazlar arasında küçük miktardaki verilerin klasik Bluetooth'a göre hem daha hızlı transfer edilmesini sağlayan hem de daha az enerji gerektiren bir teknolojidir. Bu sayede BLE, nesnelerin interneti alanında oldukça fazla kullanılmaktadır.

Çalıştığımız bir projede Android üzerinde BLE kullanmamız gerekti ve her ne kadar BLE'nin Android üzerinde uygulanışı biraz sancılı olsa da en azından verinin karşıdaki cihaza aktarımını gerçekleştirebildik.  

Öncelikle gerekli izinlerin `AndroidManifest.xml` dosyasına eklenmesi gerek.

{% highlight xml %}

<uses-permission android:name="android.permission.BLUETOOTH" />
<uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />

<uses-feature
    android:name="android.hardware.bluetooth_le"
    android:required="true" />

{% endhighlight %}

Yukarıdaki izinleri kullanıcının kendisi açması gerekir. Bu yüzden her izin için kullanıcıya bir arayüz ile erişim yetkisi istemelisiniz. Bu yazının sade olması ve uzun olmaması için bu adımlar atlıyoruz.

`mConnectedGatt`, BLE cihazlarının [GATT][GATT] profilini tanımlar. Bu profilde BLE servislerini taramak, bağlantının yönetilmesi, `MTU`(Maksimum transfer kotası) belirlenmesi ve BLE cihazlarının servis ve karakteristik özelliklerine erişim gibi özellikler bulunur.

`characteristic`, cihazın pil seviyesini, seri numarasını veya cihaza gönderilecek verileri tutan bir veri taşıyıcısıdır yani anlamlı verilerin tutulduğu değişkendir. 

{% highlight kotlin %}

private var mConnectedGatt: BluetoothGatt? = null
private var characteristic: BluetoothGattCharacteristic? = null

private const val ENVIRONMENTAL_SERVICE_UUID: String =
    "<SERVICE_UUID>"
private const val CHARACTERISTIC_UUID: String = "<CHARACTERISTIC_UUID>"
private val serviceUuid = UUID.fromString(ENVIRONMENTAL_SERVICE_UUID)
private val charUuid = UUID.fromString(CHARACTERISTIC_UUID)

{% endhighlight %}

`bluetoothAdapter`, direkt olarak bluetooth donanımını temsil eder. Bluetooth'u açıp/kapatmak ve BLE cihazlarını taramak için kullanılır.

{% highlight kotlin %}

private val bluetoothAdapter: BluetoothAdapter by lazy {
    val bluetoothManager = activity?.getSystemService(BLUETOOTH_SERVICE) as BluetoothManager
    bluetoothManager.adapter
}

private val bleScanner by lazy {
    bluetoothAdapter.bluetoothLeScanner
}

private val scanSettings = ScanSettings.Builder()
    .setScanMode(ScanSettings.SCAN_MODE_LOW_LATENCY)
    .setScanMode(ScanSettings.CALLBACK_TYPE_FIRST_MATCH)
    .build()

{% endhighlight %}

BLE cihazları tarandığında scanCallback() çalışacaktır. onScanResult() metodu içerisinde taranan cihazlar görülecektir. if() kısmında ise şartınıza uyan cihaz hangisi ise `result.let{}` ile o cihaza BLE bağlantısı kurulmaya çalışılacak.

{% highlight kotlin %}

private val scanCallback = object: ScanCallback() {
    override fun onScanResult(callbackType: Int, result: ScanResult) {
        super.onScanResult(callbackType, result)
        Log.i("onScanResult", result.device.toString())
        if (<your condition is true>) {
            result.let { result.device.connectGatt(context, true, gattCallback) }
        }
    }
    override fun onBatchScanResults(results: MutableList<ScanResult>?) {
        super.onBatchScanResults(results)
        Log.i("DeviceListActivity", "onBatchScanResults:${results.toString()}")
    }
    override fun onScanFailed(errorCode: Int) {
        super.onScanFailed(errorCode)
        Log.i("DeviceListActivity", "onScanFailed: $errorCode")
    }
}

{% endhighlight %}

Bağlanılmak istenen cihaz bulunduğunda `gattCallback()` çağırılır. `onConnectionStateChange()` içerisindeki `newState` ile bağlantının sağlandığını veya bağlantının koptuğunu belirleyebiliriz. Bağlantı sağlandı ise `gatt?.requestMtu(64)` ile istenilen MTU miktarını belirtmeliyiz. MTU isteğinin ardından `onMtuChanged` metodu çağırılır ve ardından istenilen servise bağlanmak için `gatt?.discoverServices()` ile `onServicesDiscovered()` methodu çağırılır. Eğer istenilen servise bağlantı başarılı ise `isServiceDiscovered = true` ile `isServiceDiscovered` değişkenine bir `setter` belirleyip bağlantının başarılı olduğuna dair bir bildirim veya popup gösterebiliriz.

{% highlight kotlin %}

private val gattCallback = object: BluetoothGattCallback() {
    override fun onConnectionStateChange(gatt: BluetoothGatt?, status: Int, newState: Int) {
        deviceAddress = gatt?.device?.address
        if (status == BluetoothGatt.GATT_SUCCESS) {
            mConnectedGatt = gatt
            mDeviceState = newState
            when (newState) {
                BluetoothProfile.STATE_CONNECTED -> {
                    Log.i("STATE_CONNECTED", "to  $deviceAddress")
                    gatt?.requestMtu(64)
                }
                BluetoothProfile.STATE_DISCONNECTED -> {
                    Log.i("STATE_DIS_connected", "STATE_DIS_connected")
                     mConnectedGatt?.close()
                }
            }
        } else {
            mDeviceState = -1
            Log.i(
                "onConnectionStateChange",
                "Error $status encountered for $deviceAddress! Disconnecting..."
            )
        }
    }
    override fun onMtuChanged(gatt: BluetoothGatt?, mtu: Int, status: Int) {
        super.onMtuChanged(gatt, mtu, status)
        Log.i("onMtuChanged", "$mtu, status:$status")
        gatt?.discoverServices()
    }
    override fun onServicesDiscovered(gatt: BluetoothGatt?, status: Int) {
        Log.i("onServicesDiscovered", "onServicesDiscovered")
        characteristic = gatt?.getService(serviceUuid)
            ?.getCharacteristic(charUuid)
        gatt?.setCharacteristicNotification(characteristic, false)
        characteristic?.writeType = BluetoothGattCharacteristic.WRITE_TYPE_NO_RESPONSE
        isServiceDiscovered = true
    }
    override fun onCharacteristicWrite(
        gatt: BluetoothGatt?, characteristic: BluetoothGattCharacteristic?, status: Int
    ) {
        with(characteristic) {
            when (status) {
                BluetoothGatt.GATT_SUCCESS -> {
                    Log.i("onCharacteristicWrite", "Wrote to characteristic ${this?.uuid}")
                }
                BluetoothGatt.GATT_INVALID_ATTRIBUTE_LENGTH -> {
                    Log.e("onCharacteristicWrite", "Write exceeded connection ATT MTU!")
                }
                BluetoothGatt.GATT_WRITE_NOT_PERMITTED -> {
                    Log.e("onCharacteristicWrite", "Write not permitted for ${this?.uuid}!")
                }
                else -> {
                    Log.e(
                        "onCharacteristicWrite",
                        "Characteristic write failed for ${this?.uuid}, error: $status"
                    )
                }
            }
        }
    }
    override fun onCharacteristicRead(
        gatt: BluetoothGatt?, characteristic: BluetoothGattCharacteristic?, status: Int
    ) {
        Log.i("onCharacteristicRead", "$gatt, $characteristic. $status")
    }
    override fun onCharacteristicChanged(
        gatt: BluetoothGatt?, characteristic: BluetoothGattCharacteristic?
    ) {
        Log.i("onCharacteristicChanged", "$gatt, $characteristic")
    }
}

{% endhighlight %}

BLE cihazlarını taramak için `bleScanner.startScan(null, scanSettings, scanCallback)`, taramayı durdurmak için ise `bleScanner.stopScan(scanCallback)` kullanılır.


{% highlight kotlin %}

private val handler = Handler()

// Stops scanning after 10 seconds.
private val SCAN_PERIOD: Long = 10000

private fun scanLeDevice() {
    if (!mScanning) { // Stops scanning after a pre-defined scan period.
        handler.postDelayed({
            mScanning = false
            bleScanner.stopScan(scanCallback)
        }, SCAN_PERIOD)
        mScanning = true
        bleScanner.startScan(null, scanSettings, scanCallback)
    } else {
        mScanning = false
        bleScanner.stopScan(scanCallback)
    }
}

{% endhighlight %}

Bağlanılan cihaza gönderilecek veri `byte array` tipine dönüştürülmesi gerekir.  

{% highlight kotlin %}

val byteArray =
    "{'data': '$data'}".toByteArray(charset)

{% endhighlight %}

Daha sonra `characteristic` ve `mConnectedGatt` değişkenleri `null` durumundan farklı ise veriyi BLE cihazına göndermek gerekir.

{% highlight kotlin %}

try {
    if (characteristic == null || mConnectedGatt == null) {
        // bağlantı yok öyleyse bağlantıyı başlat
        scanLeDevice()
    } else {
    	// bağlantı var öyleyse veriyi gönder
        characteristic!!.value = byteArray
        mConnectedGatt?.writeCharacteristic(characteristic)
    }
} catch (e: Exception) {
    Log.e("ERROR", e.toString())
}

{% endhighlight %}

___

<br>
Kaynaklar:
- [https://punchthrough.com/android-ble-guide/]
- [https://www.bluetooth.com/specifications/GATT/]
- [https://developer.android.com/guide/topics/connectivity/bluetooth-le]

[GATT]: https://www.bluetooth.com/specifications/GATT/
[https://punchthrough.com/android-ble-guide/]: https://punchthrough.com/android-ble-guide/
[https://www.bluetooth.com/specifications/GATT/]: https://www.bluetooth.com/specifications/GATT/
[https://developer.android.com/guide/topics/connectivity/bluetooth-le]: https://developer.android.com/guide/topics/connectivity/bluetooth-le