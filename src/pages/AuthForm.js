import { useState } from "react";

const AuthForm = () => {
    const [isActive, setIsActive] = useState(false);

    const [registerData, setRegisterData] = useState({
        nama: "",
        email: "",
        password: "",
        nomorTelepon: "",
        alamat: "",
    });

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const backendUrl = "http://localhost:3001/api/user";

    const handleRegisterChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    };

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        const payload = { ...registerData};

        try {
            const response = await fetch(`${backendUrl}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const result = await response.json();
            if (response.ok) {
                alert("Registrasi berhasil! Silakan login.");
                setIsActive(false); 
                setRegisterData({ nama: "", email: "", password: "" , nomorTelepon: ""}); 
            } else {
                alert(
                    `Registrasi gagal: ${
                        result.message || "Error tidak diketahui"
                    }`
                );
            }
        } catch (error) {
            console.error("Error saat registrasi:", error);
            alert("Tidak dapat terhubung ke server.");
        }
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${backendUrl}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData),
            });
            const result = await response.json();
            if (response.ok) {
                alert("Login berhasil!");
                localStorage.setItem('token', result.token);
                window.location.href = '/produk';
            } else {
                alert(
                    `Login gagal: ${
                        result.message || "Email atau password salah"
                    }`
                );
            }
        } catch (error) {
            console.error("Error saat login:", error);
            alert("Tidak dapat terhubung ke server.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-200">
            <div
                className={`relative w-[896px] max-w-full h-[560px] bg-white rounded-2xl shadow-xl overflow-hidden group ${
                    isActive ? "active" : ""
                }`}
            >
                {/* Form Register */}
                <div
                    className={`absolute top-0 left-0 h-full w-1/2 flex items-center justify-center transition-all duration-700 ease-in-out z-20 ${
                        isActive
                            ? "translate-x-full opacity-0"
                            : "translate-x-0 opacity-100"
                    }`}
                >
                    <form
                        onSubmit={handleRegisterSubmit}
                        className="w-full text-center px-10"
                    >
                        <h1 className="text-3xl font-bold text-gray-800">
                            Create Account
                        </h1>
                        <span className="text-xs text-gray-500">
                            or use your email for registration
                        </span>
                        <input
                            type="text"
                            name="nama"
                            placeholder="Name"
                            value={registerData.nama}
                            onChange={handleRegisterChange}
                            className="bg-gray-100 border-none my-2 p-3 text-sm rounded-lg w-full outline-none"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={registerData.email}
                            onChange={handleRegisterChange}
                            className="bg-gray-100 border-none my-2 p-3 text-sm rounded-lg w-full outline-none"
                            required
                        />
                        <input
                            type="number"
                            name="nomorTelepon"
                            placeholder="Nomor Telepon"
                            value={registerData.nomorTelepon}
                            onChange={handleRegisterChange}
                            className="bg-gray-100 border-none my-2 p-3 text-sm rounded-lg w-full outline-none"
                            required
                        />
                        <textarea
                            name="alamat"
                            placeholder="Alamat"
                            rows="2"
                            value={registerData.alamat || ""}
                            onChange={handleRegisterChange}
                            className="bg-gray-100 border-none my-2 p-3 text-sm rounded-lg w-full outline-none"
                        ></textarea>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={registerData.password}
                            onChange={handleRegisterChange}
                            className="bg-gray-100 border-none my-2 p-3 text-sm rounded-lg w-full outline-none"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-amber-500 text-white font-bold uppercase py-3 px-8 rounded-full shadow-md hover:bg-amber-700 transition-transform active:scale-95 mt-4"
                        >
                            Sign Up
                        </button>
                    </form>
                </div>

                {/* Form Login */}
                <div
                    className={`absolute top-0 left-0 h-full w-1/2 flex items-center justify-center transition-all duration-700 ease-in-out z-10 ${
                        isActive
                            ? "translate-x-full opacity-100 z-50"
                            : "translate-x-0 opacity-0"
                    }`}
                >
                    <form
                        onSubmit={handleLoginSubmit}
                        className="w-full text-center px-10"
                    >
                        <h1 className="text-3xl font-bold text-gray-800">
                            Sign In
                        </h1>
                        <span className="text-xs text-gray-500">
                            or use your email password
                        </span>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={loginData.email}
                            onChange={handleLoginChange}
                            className="bg-gray-100 border-none my-2 p-3 text-sm rounded-lg w-full outline-none"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={loginData.password}
                            onChange={handleLoginChange}
                            className="bg-gray-100 border-none my-2 p-3 text-sm rounded-lg w-full outline-none"
                            required
                        />
                        <button
                            type="button"
                            onClick={() =>
                                alert("Fitur lupa password belum tersedia")
                            }
                            className="text-xs text-gray-600 mt-4 inline-block"
                        >
                            Forget Your Password?
                        </button>
                        <br></br>
                        <button
                            type="submit"
                            className="bg-amber-500 text-white font-bold uppercase py-3 px-8 rounded-full shadow-md hover:bg-amber-700 transition-transform active:scale-95 mt-2"
                        >
                            Sign In
                        </button>
                    </form>
                </div>

                {/* Overlay Container */}
                <div
                    className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out z-50 ${
                        isActive
                            ? "-translate-x-full rounded-r-[18%]"
                            : "translate-x-0 rounded-l-[18%]"
                    }`}
                >
                    <div
                        className={`relative -left-full h-full w-[200%] text-white bg-amber-500 transition-transform duration-700 ease-in-out ${
                            isActive
                                ? "translate-x-1/2 rounded-r-[18%]"
                                : "translate-x-0 rounded-l-[18%]"
                        }`}
                    >
                        {/* Overlay Left */}
                        <div
                            className={`absolute top-0 w-1/2 h-full flex flex-col justify-center items-center text-center px-10 transition-transform duration-700 ease-in-out ${
                                isActive
                                    ? "translate-x-0"
                                    : "-translate-x-[20%]"
                            }`}
                        >
                            <h1 className="text-3xl font-bold">
                                Welcome Back!
                            </h1>
                            <p className="text-sm my-4">
                                Enter your personal details to use all of site
                                features
                            </p>
                            <button
                                onClick={() => setIsActive(false)}
                                className="bg-transparent border-2 border-white font-bold uppercase py-2 px-8 rounded-full hover:bg-white hover:text-gray-800 transition-colors"
                            >
                                Sign Up
                            </button>
                        </div>
                        {/* Overlay Right */}
                        <div
                            className={`absolute top-0 right-0 w-1/2 h-full flex flex-col justify-center items-center text-center px-10 transition-transform duration-700 ease-in-out ${
                                isActive ? "translate-x-[20%]" : "translate-x-0"
                            }`}
                        >
                            <h1 className="text-3xl font-bold">
                                Hello, Friend!
                            </h1>
                            <p className="text-sm my-4">
                                Register with your personal details to use all
                                of site features
                            </p>
                            <button
                                onClick={() => setIsActive(true)}
                                className="bg-transparent border-2 border-white font-bold uppercase py-2 px-8 rounded-full hover:bg-white hover:text-gray-800 transition-colors"
                            >
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;