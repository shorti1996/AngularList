package com.wlsoft.wojciechliebert.angularlist

import android.util.Log
import android.webkit.JavascriptInterface

class JsCommunicationInterface {
    companion object {
        private val TAG = JsCommunicationInterface::class.java.simpleName
    }

    @JavascriptInterface
    fun logg(message: String) {
        Log.d(TAG, message)
    }
}