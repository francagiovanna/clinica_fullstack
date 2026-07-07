import { Outlet } from "react-router"
import { useAuth } from "../contexts/AuthContext"
import { useTheme } from "../contexts/ThemeContext"
import SideMenu from "../components/SideMenu"
import { MdLightMode, MdDarkMode } from "react-icons/md"

const DashboardLayout = () => {
    const { user, logout } = useAuth()
    const { theme, toggleTheme } = useTheme()

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors">
            <SideMenu />

            <main className="flex-1 flex flex-col">
                <header className="flex justify-between items-center bg-white dark:bg-gray-900 p-4 shadow transition-colors">
                    <h1 className="text-xl font-bold text-cyan-800 dark:text-cyan-300">
                        Painel do Sistema
                    </h1>
                    {user && (
                        <div className="flex items-center gap-4">
                            <button
                                onClick={toggleTheme}
                                title="Alternar tema"
                                className="p-2 rounded-full text-gray-600 dark:text-yellow-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
                            >
                                {theme === 'dark' ? <MdLightMode size={20} /> : <MdDarkMode size={20} />}
                            </button>
                            <span className="text-gray-700 dark:text-gray-200">
                                Bem Vindo, {user.email}
                            </span>
                            <button
                                onClick={logout}
                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                            >
                                Sair
                            </button>
                        </div>
                    )}
                </header>

                <section className="flex-1 p-6 overflow-y-auto bg-gray-100 dark:bg-gray-950 transition-colors">
                    <Outlet />
                </section>
            </main>
        </div>
    )
}

export default DashboardLayout