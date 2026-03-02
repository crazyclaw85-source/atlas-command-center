"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  Target,
  Clock,
} from "lucide-react";

interface MarketData {
  time: string;
  price: number;
}

interface Signal {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  signal: "BUY" | "SELL" | "HOLD";
  timestamp: string;
  trend: "up" | "down";
}

interface Alert {
  id: string;
  symbol: string;
  type: "BUY" | "SELL";
  price: number;
  time: string;
  message: string;
}

export default function TradingPage() {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [signals, setSignals] = useState<Signal[]>([
    {
      symbol: "NQ",
      price: 21567.50,
      change: 125.75,
      changePercent: 0.59,
      signal: "BUY",
      timestamp: "14:23:45",
      trend: "up",
    },
    {
      symbol: "ES",
      price: 5890.25,
      change: -23.50,
      changePercent: -0.40,
      signal: "SELL",
      timestamp: "14:20:12",
      trend: "down",
    },
    {
      symbol: "GC",
      price: 2654.80,
      change: 15.20,
      changePercent: 0.58,
      signal: "HOLD",
      timestamp: "14:18:33",
      trend: "up",
    },
  ]);

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      symbol: "NQ",
      type: "BUY",
      price: 21567.50,
      time: "14:23:45",
      message: "Breakout above resistance at 21550",
    },
    {
      id: "2",
      symbol: "ES",
      type: "SELL",
      price: 5890.25,
      time: "14:20:12",
      message: "Failed to hold support at 5900",
    },
    {
      id: "3",
      symbol: "GC",
      type: "BUY",
      price: 2654.80,
      time: "14:18:33",
      message: "Golden cross signal confirmed",
    },
  ]);

  const accountSummary = {
    balance: 50000.00,
    openPnL: 1250.00,
    availableMargin: 35000.00,
    openPositions: 2,
  };

  // Generate mock price data
  useEffect(() => {
    const generateData = () => {
      const data: MarketData[] = [];
      let basePrice = 21500;
      
      for (let i = 49; i >= 0; i--) {
        const time = new Date(Date.now() - i * 60000).toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        });
        
        basePrice += (Math.random() - 0.5) * 20;
        data.push({
          time,
          price: Math.round(basePrice * 100) / 100,
        });
      }
      
      setMarketData(data);
    };

    generateData();
    
    // Update data every 5 seconds
    const interval = setInterval(() => {
      setMarketData(prev => {
        const newData = [...prev];
        const lastPrice = newData[newData.length - 1]?.price || 21500;
        const newPrice = lastPrice + (Math.random() - 0.5) * 20;
        
        newData.shift(); // Remove first element
        newData.push({
          time: new Date().toLocaleTimeString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
          }),
          price: Math.round(newPrice * 100) / 100,
        });
        
        return newData;
      });

      // Update signals occasionally
      if (Math.random() > 0.8) {
        setSignals(prev => prev.map(signal => ({
          ...signal,
          price: signal.price + (Math.random() - 0.5) * 10,
          change: signal.change + (Math.random() - 0.5) * 5,
          changePercent: signal.changePercent + (Math.random() - 0.5) * 0.2,
          timestamp: new Date().toLocaleTimeString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
        })));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Trading Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor signals and trading performance for NQ, ES, and GC futures
        </p>
      </div>

      {/* Account Summary */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Account Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(accountSummary.balance)}</div>
            <p className="text-xs text-muted-foreground">Available funds</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open P&L</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              +{formatCurrency(accountSummary.openPnL)}
            </div>
            <p className="text-xs text-muted-foreground">Unrealized gains</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Margin</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(accountSummary.availableMargin)}</div>
            <p className="text-xs text-muted-foreground">Buying power</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Positions</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{accountSummary.openPositions}</div>
            <p className="text-xs text-muted-foreground">Active trades</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Price Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>NQ Price Action</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={marketData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="time" 
                    tick={{ fontSize: 12 }}
                    interval="preserveStartEnd"
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    domain={['dataMin - 50', 'dataMax + 50']}
                  />
                  <Tooltip 
                    labelFormatter={(value) => `Time: ${value}`}
                    formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
                  />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="#3b82f6"
                    fillOpacity={0.1}
                    fill="#3b82f6"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Signal Cards */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Live Signals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {signals.map((signal) => (
                <div
                  key={signal.symbol}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-lg font-semibold">{signal.symbol}</div>
                    <div className="flex items-center space-x-2">
                      {signal.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                      <span className="font-medium">${signal.price.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${
                      signal.changePercent >= 0 ? "text-green-600" : "text-red-600"
                    }`}>
                      {signal.changePercent >= 0 ? "+" : ""}{signal.changePercent.toFixed(2)}%
                    </div>
                    <div className={`text-xs px-2 py-1 rounded ${
                      signal.signal === "BUY" 
                        ? "bg-green-100 text-green-800" 
                        : signal.signal === "SELL"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {signal.signal}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Active Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-center justify-between p-3 border-l-4 border-l-blue-500 bg-blue-50/50"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">{alert.symbol}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      alert.type === "BUY" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {alert.type}
                    </span>
                    <span className="text-sm font-medium">${alert.price.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                </div>
                <div className="text-sm text-muted-foreground">{alert.time}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}