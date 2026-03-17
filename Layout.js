import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "./utils";

// UI Components
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// Icons
import {
  LayoutDashboard,
  Users,
  Clock,
  Calendar,
  Settings,
  LogOut,
  Menu,
  ChevronRight,
  User,
  CalendarDays,
  BarChart3,
  X,
  Bell,
} from "lucide-react";

// Helper
import { cn } from "@/lib/utils";

// Navigation links
const navigation = [
  { name: "Dashboard", href: "Dashboard", icon: LayoutDashboard },
  { name: "My Profile", href: "MyProfile", icon: User },
  { name: "Employees", href: "Employees", icon: Users },
  { name: "Timesheet", href: "Timesheet", icon: Clock },
  { name: "Shifts", href: "Shifts", icon: CalendarDays },
  { name: "Leave", href: "Leave", icon: Calendar },
  { name: "Alerts", href: "Alerts", icon: Bell },
  { name: "Reports", href: "Reports", icon: BarChart3 },
  { name: "Settings", href: "Settings", icon: Settings },
];

export default function Layout({ children, currentPageName }) {
  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Simulated user fetch (replace with your real auth logic)
  useEffect(() => {
    const fakeUser = {
      full_name: "John Doe",
      email: "john@example.com",
      role: "admin",
    };
    setUser(fakeUser);
  }, []);

  // Logout handler (replace with real logic)
  const handleLogout = () => {
    console.log("User logged out");
  };

  // Navigation item component
  const NavItem = ({ item, mobile = false }) => {
    const isActive = currentPageName === item.href;
    const Icon = item.icon;

    return (
      <Link
        to={createPageUrl(item.href)}
        onClick={() => mobile && setMobileOpen(false)}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition",
          isActive
            ? "bg-slate-900 text-white"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        )}
      >
        <Icon className="w-5 h-5" />
        {item.name}
        {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* Sidebar (Desktop) */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col fixed inset-y-0">
        <div className="flex flex-col flex-grow bg-white border-r">

          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-5 border-b">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold">TimeTrack</h1>
              <p className="text-xs text-gray-500">Attendance System</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1">
            {navigation.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </nav>

          {/* User section */}
          {user && (
            <div className="p-4 border-t">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-100">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>
                        {user.full_name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="text-sm font-medium">
                        {user.full_name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {user.role}
                      </p>
                    </div>
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to={createPageUrl("MyProfile")}>
                      <User className="w-4 h-4 mr-2" />
                      My Profile
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b">
        <span className="font-bold">TimeTrack</span>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-72 p-0">
            <div className="flex flex-col h-full">

              {/* Mobile nav */}
              <nav className="flex-1 p-4 space-y-1">
                {navigation.map((item) => (
                  <NavItem key={item.name} item={item} mobile />
                ))}
              </nav>

              {/* Mobile user */}
              {user && (
                <div className="p-4 border-t">
                  <p className="font-medium">{user.full_name}</p>
                  <p className="text-sm text-gray-500">{user.role}</p>

                  <Button
                    className="w-full mt-3"
                    variant="outline"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content */}
      <main className="lg:pl-64">{children}</main>
    </div>
  );
}
