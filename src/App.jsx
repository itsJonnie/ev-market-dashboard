import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Progress } from './components/ui/progress';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Area, AreaChart
} from 'recharts';
import { 
  TrendingUp, TrendingDown, DollarSign, Users, Zap, 
  Globe, Target, Award, ChevronRight, BarChart3,
  PieChart as PieChartIcon, LineChart as LineChartIcon
} from 'lucide-react';
import { motion } from 'framer-motion';
import './App.css';

// Market data for charts
const marketGrowthData = [
  { year: '2025', revenue: 784.2, units: 13.66 },
  { year: '2026', revenue: 825.8, units: 14.5 },
  { year: '2027', revenue: 869.7, units: 15.4 },
  { year: '2028', revenue: 916.1, units: 16.3 },
  { year: '2029', revenue: 990.4, units: 17.36 }
];

const marketShareData = [
  { name: 'BYD', value: 18, color: '#F18F01' },
  { name: 'Tesla', value: 18, color: '#C73E1D' },
  { name: 'SAIC', value: 8, color: '#2E86AB' },
  { name: 'Geely-Volvo', value: 8, color: '#A23B72' },
  { name: 'Volkswagen', value: 7, color: '#F24236' },
  { name: 'Others', value: 41, color: '#8B8B8B' }
];

const portersForcesData = [
  { force: 'New Entrants', score: 3.5, description: 'Moderate to High' },
  { force: 'Supplier Power', score: 4.5, description: 'High' },
  { force: 'Buyer Power', score: 3.0, description: 'Moderate' },
  { force: 'Substitutes', score: 2.5, description: 'Low to Moderate' },
  { force: 'Rivalry', score: 4.5, description: 'High' }
];

const regionalAdoptionData = [
  { region: 'Norway', adoption: 82 },
  { region: 'China', adoption: 35 },
  { region: 'Netherlands', adoption: 30 },
  { region: 'Germany', adoption: 18 },
  { region: 'UK', adoption: 16 },
  { region: 'USA', adoption: 9 }
];

const batterySupplyData = [
  { supplier: 'CATL', share: 37.9, country: 'China' },
  { supplier: 'LG Energy', share: 22, country: 'S. Korea' },
  { supplier: 'Panasonic', share: 15, country: 'Japan' },
  { supplier: 'BYD', share: 12, country: 'China' },
  { supplier: 'Others', share: 13.1, country: 'Various' }
];

function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationProgress(prev => (prev >= 100 ? 0 : prev + 1));
    }, 50);
    return () => clearInterval(timer);
  }, []);

  const StatCard = ({ title, value, change, icon: Icon, trend }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          <div className="flex items-center text-xs text-muted-foreground">
            {trend === 'up' ? (
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
            ) : (
              <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
            )}
            {change}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Zap className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  EV Market Analysis
                </h1>
              </div>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                Strategic Intelligence Dashboard
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">2025 Market Data</Badge>
              <Button variant="ghost" size="sm">
                <Globe className="h-4 w-4 mr-2" />
                Global View
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Market Size (2025)"
            value="$784.2B"
            change="+6.01% CAGR"
            icon={DollarSign}
            trend="up"
          />
          <StatCard
            title="Unit Sales (2025)"
            value="13.66M"
            change="+27% YoY"
            icon={BarChart3}
            trend="up"
          />
          <StatCard
            title="Market Leaders"
            value="BYD & Tesla"
            change="18% each"
            icon={Award}
            trend="up"
          />
          <StatCard
            title="Digital Adoption"
            value="82%"
            change="Norway leads"
            icon={Target}
            trend="up"
          />
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="market-share" className="flex items-center space-x-2">
              <PieChartIcon className="h-4 w-4" />
              <span>Market Share</span>
            </TabsTrigger>
            <TabsTrigger value="porter-forces" className="flex items-center space-x-2">
              <Target className="h-4 w-4" />
              <span>Porter's Forces</span>
            </TabsTrigger>
            <TabsTrigger value="regional" className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>Regional</span>
            </TabsTrigger>
            <TabsTrigger value="supply-chain" className="flex items-center space-x-2">
              <LineChartIcon className="h-4 w-4" />
              <span>Supply Chain</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Market Growth Projection (2025-2029)</CardTitle>
                  <CardDescription>
                    Revenue and unit sales forecast showing steady growth trajectory
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={marketGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Area
                        yAxisId="left"
                        type="monotone"
                        dataKey="revenue"
                        stroke="#2E86AB"
                        fill="#2E86AB"
                        fillOpacity={0.3}
                        name="Revenue ($B)"
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="units"
                        stroke="#A23B72"
                        strokeWidth={3}
                        name="Units (M)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Market Insights</CardTitle>
                  <CardDescription>
                    Strategic highlights from comprehensive market analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">Market Leadership</p>
                        <p className="text-sm text-muted-foreground">
                          BYD and Tesla maintain co-leadership with 18% market share each
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">Supply Chain Dominance</p>
                        <p className="text-sm text-muted-foreground">
                          Chinese manufacturers control 51% of global battery production
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">Technology Innovation</p>
                        <p className="text-sm text-muted-foreground">
                          Rapid advancement in battery technology driving cost reduction
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">Regulatory Support</p>
                        <p className="text-sm text-muted-foreground">
                          Government incentives and emissions standards accelerating adoption
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Market Share Tab */}
          <TabsContent value="market-share" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Global Market Share (2024)</CardTitle>
                  <CardDescription>
                    Market share distribution among leading EV manufacturers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={marketShareData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {marketShareData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Competitive Positioning</CardTitle>
                  <CardDescription>
                    Strategic analysis of key market players
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {marketShareData.slice(0, 5).map((company, index) => (
                    <div key={company.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: company.color }}
                        ></div>
                        <span className="font-medium">{company.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Progress value={company.value * 2} className="w-20" />
                        <span className="text-sm font-medium">{company.value}%</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Porter's Forces Tab */}
          <TabsContent value="porter-forces" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Porter's Five Forces Analysis</CardTitle>
                <CardDescription>
                  Comprehensive competitive force assessment for the EV industry
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {portersForcesData.map((force, index) => (
                    <motion.div
                      key={force.force}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium">{force.force}</h4>
                        <p className="text-sm text-muted-foreground">{force.description}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Progress value={force.score * 20} className="w-24" />
                        <span className="text-sm font-medium w-8">{force.score}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Regional Tab */}
          <TabsContent value="regional" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Regional EV Adoption Rates</CardTitle>
                <CardDescription>
                  EV market penetration by country/region (2024)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={regionalAdoptionData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="region" type="category" width={80} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Adoption Rate']} />
                    <Bar dataKey="adoption" fill="#2E86AB" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Supply Chain Tab */}
          <TabsContent value="supply-chain" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Battery Supply Chain Analysis</CardTitle>
                <CardDescription>
                  Global EV battery market share by manufacturer
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {batterySupplyData.map((supplier, index) => (
                    <div key={supplier.supplier} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="text-lg font-bold text-muted-foreground">
                          #{index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{supplier.supplier}</p>
                          <p className="text-sm text-muted-foreground">{supplier.country}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Progress value={supplier.share * 2.5} className="w-24" />
                        <span className="text-lg font-bold">{supplier.share}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Strategic Recommendations */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Strategic Recommendations</span>
            </CardTitle>
            <CardDescription>
              Key strategic insights for market participants
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <h4 className="font-medium mb-2">For New Entrants</h4>
                <p className="text-sm text-muted-foreground">
                  Focus on niche segments or specific geographic markets to avoid direct competition with established players.
                </p>
              </div>
              <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <h4 className="font-medium mb-2">For Incumbents</h4>
                <p className="text-sm text-muted-foreground">
                  Accelerate EV transition while leveraging existing manufacturing and distribution capabilities.
                </p>
              </div>
              <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <h4 className="font-medium mb-2">For Suppliers</h4>
                <p className="text-sm text-muted-foreground">
                  Invest in capacity expansion and geographic diversification to meet growing demand.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;

