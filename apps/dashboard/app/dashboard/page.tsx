"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  Target,
  HardHat,
  Code2,
  Heart,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const quickStats = {
    trading: {
      balance: 50000.00,
      pnl: 1250.00,
      openPositions: 2,
      signals: 3,
    },
    construction: {
      activeProjects: 8,
      pendingQuotes: 5,
      scheduledThisWeek: 12,
      revenue: 45000,
    },
    tech: {
      activeBuilds: 3,
      openIssues: 7,
      deployments: 15,
      uptime: "99.8%",
    },
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Atlas Command Center</h1>
          <p className="text-muted-foreground">
            Your unified view across trading, construction, tech, and life
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-mono">
            {currentTime.toLocaleTimeString('en-US', { 
              hour12: false,
              timeZone: 'Europe/London' 
            })}
          </div>
          <div className="text-sm text-muted-foreground">
            {currentTime.toLocaleDateString('en-US', { 
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trading P&L</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              +{formatCurrency(quickStats.trading.pnl)}
            </div>
            <p className="text-xs text-muted-foreground">
              {quickStats.trading.openPositions} open positions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Account Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(quickStats.trading.balance)}</div>
            <p className="text-xs text-muted-foreground">
              {quickStats.trading.signals} active signals
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <HardHat className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{quickStats.construction.activeProjects}</div>
            <p className="text-xs text-muted-foreground">
              {quickStats.construction.scheduledThisWeek} scheduled this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue MTD</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(quickStats.construction.revenue)}</div>
            <p className="text-xs text-muted-foreground">
              {quickStats.construction.pendingQuotes} pending quotes
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Section Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Trading Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Trading
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Open P&L</span>
              <span className="text-sm font-medium text-green-600">
                +{formatCurrency(quickStats.trading.pnl)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Positions</span>
              <span className="text-sm font-medium">{quickStats.trading.openPositions}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Signals</span>
              <span className="text-sm font-medium">{quickStats.trading.signals}</span>
            </div>
            <Link href="/dashboard/trading">
              <Button className="w-full" variant="outline">
                View Trading Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Construction Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardHat className="h-5 w-5" />
              Construction
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Active Projects</span>
              <span className="text-sm font-medium">{quickStats.construction.activeProjects}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">This Week</span>
              <span className="text-sm font-medium">{quickStats.construction.scheduledThisWeek}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Pending Quotes</span>
              <span className="text-sm font-medium">{quickStats.construction.pendingQuotes}</span>
            </div>
            <Link href="/dashboard/construction">
              <Button className="w-full" variant="outline">
                View Construction
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Tech Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="h-5 w-5" />
              Tech
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Active Builds</span>
              <span className="text-sm font-medium">{quickStats.tech.activeBuilds}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Open Issues</span>
              <span className="text-sm font-medium">{quickStats.tech.openIssues}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Uptime</span>
              <span className="text-sm font-medium text-green-600">{quickStats.tech.uptime}</span>
            </div>
            <Link href="/dashboard/tech">
              <Button className="w-full" variant="outline">
                View Tech Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Life Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Life
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Today's Tasks</span>
              <span className="text-sm font-medium">5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Completed</span>
              <span className="text-sm font-medium text-green-600">3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Upcoming</span>
              <span className="text-sm font-medium">7</span>
            </div>
            <Link href="/dashboard/life">
              <Button className="w-full" variant="outline">
                View Life Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Button className="justify-start" variant="outline">
              📊 Check Latest Signals
            </Button>
            <Button className="justify-start" variant="outline">
              🏗️ Update Project Status
            </Button>
            <Button className="justify-start" variant="outline">
              💻 Deploy Latest Build
            </Button>
            <Button className="justify-start" variant="outline">
              📅 Review Calendar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}