import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Shield, Eye, Lock, AlertTriangle, ArrowRight, Menu } from "lucide-react"

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" to="#">
          <Shield className="h-6 w-6" />
          <span className="sr-only">Data Shield</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" to="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" to="#">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" to="#">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" to="#">
            Contact
          </Link>
        </nav>
        <div className="hidden sm:flex gap-4">
          <Button variant="outline">Log In</Button>
          <Button>Sign Up</Button>
        </div>
        <Button variant="ghost" className="sm:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Protect Your Data with Advanced Leak Detection
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Our Online Data Leakage Detection System safeguards your sensitive information with cutting-edge technology.
                </p>
              </div>
              <div className="space-x-4">
                <Button>Get Started</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">Key Features</h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Eye className="h-8 w-8 mb-2" />
                <h3 className="text-xl font-bold">Real-time Monitoring</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Continuous surveillance of your data streams to detect potential leaks instantly.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Lock className="h-8 w-8 mb-2" />
                <h3 className="text-xl font-bold">Advanced Encryption</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  State-of-the-art encryption techniques to secure your sensitive information.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <AlertTriangle className="h-8 w-8 mb-2" />
                <h3 className="text-xl font-bold">Instant Alerts</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Immediate notifications when potential data leaks are detected.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">How It Works</h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <div className="bg-primary text-primary-foreground rounded-full p-2 w-8 h-8 flex items-center justify-center text-lg font-bold mb-2">1</div>
                <h3 className="text-xl font-bold">Connect</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Integrate our system with your data sources and networks.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <div className="bg-primary text-primary-foreground rounded-full p-2 w-8 h-8 flex items-center justify-center text-lg font-bold mb-2">2</div>
                <h3 className="text-xl font-bold">Monitor</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Our AI-powered system continuously scans for potential data leaks.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <div className="bg-primary text-primary-foreground rounded-full p-2 w-8 h-8 flex items-center justify-center text-lg font-bold mb-2">3</div>
                <h3 className="text-xl font-bold">Protect</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Receive alerts and take immediate action to prevent data leaks.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Secure Your Data?
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Start protecting your sensitive information today with our advanced Online Data Leakage Detection System.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
                  <Button type="submit">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  By signing up, you agree to our <Link className="underline underline-offset-2" to="#">Terms & Conditions</Link>.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Data Shield Inc. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" to="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" to="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

export default Home;