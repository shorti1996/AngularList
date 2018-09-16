package com.wlsoft.wojciechliebert.angularlist

import android.annotation.SuppressLint
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.MotionEvent
import android.webkit.WebView
import kotlinx.android.synthetic.main.activity_main.*
import android.webkit.WebViewClient
import android.webkit.WebChromeClient



class MainActivity : AppCompatActivity() {

    val TAG = "MainActivity.Log"

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        WebView.setWebContentsDebuggingEnabled(true)
        webViewMain.settings.javaScriptEnabled = true
        webViewMain.settings.setSupportZoom(true)
//        webViewMain.settings.builtInZoomControls = true
        webViewMain.settings.builtInZoomControls = false
        webViewMain.settings.displayZoomControls = false
        webViewMain.addJavascriptInterface(JsCommunicationInterface(), "Android")
//        webViewMain.setWebChromeClient(WebChromeClient())
//        webViewMain.setWebViewClient(WebViewClient())

//        webViewMain.loadUrl("file:///android_asset/list.html")
//        webViewMain.loadUrl("file:///android_asset/child_html.html")
        webViewMain.loadUrl("file:///android_asset/zoom_test.html")
    }

    override fun onResume() {
        super.onResume()

//        webViewMain.evaluateJavascript("", {it -> })
    }

    override fun dispatchTouchEvent(ev: MotionEvent?): Boolean {
        if (ev?.pointerCount == 2) {

            Log.d(TAG, "HERE ${ev.x}, ${ev.y}")
            webViewMain.evaluateJavascript("document.elementFromPoint(${ev.x}, ${ev.y});")
            { it -> Log.d(TAG, it)}
        }
        return super.dispatchTouchEvent(ev)
    }


}
