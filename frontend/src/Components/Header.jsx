import { useEffect, useState } from 'react';
import { Disclosure, Menu } from '@headlessui/react';
import { XMarkIcon, Bars3Icon, ClipboardDocumentIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';

const navigation = [
  { name: 'Home', href: '/home', current: false },
  { name: 'All tasks', href: 'all', current: false },
  { name: 'Pending tasks', href: 'pending', current: false },
  { name: 'Ongoing tasks', href: 'ongoing', current: false },
  { name: 'Completed tasks', href: 'completed', current: false },
];

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

const Header = () => {
  const [userData, setUserData] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const fetchUserData = () => {
    axios
      .get('/api/v4/user/get-user-data')
      .then((response) => {
        setUserData(response.data);
        console.log('User data:', response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  };

  const handleSignOut = async () => {
    try {
      await axios.post(
        '/api/v4/user/logout',
        {},
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      );
      navigate('/login');
      console.log('User signed out');
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  };

  const userNavigation = [
    { name: 'Your Profile', href: 'profile' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', onClick: handleSignOut },
  ];

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center">
                  <ClipboardDocumentIcon className="h-8 w-8 text-blue-400 mr-2" aria-hidden="true" />
                  <h1 className="font-bold text-2xl text-blue-400">TASK HUB</h1>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium',
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 rounded-md text-gray-300 hover:bg-gray-700 focus:outline-none"
                  >
                    {darkMode ? (
                      <SunIcon className="h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MoonIcon className="h-6 w-6" aria-hidden="true" />
                    )}
                  </button>
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex max-w-xs h-10 w-10 items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <img
                          className="h-full object-cover w-full rounded-full"
                          src={
                            userData.profile
                              ? `https://task-management-backend-yfrd.onrender.com/images/upload/${userData.profile}`
                              : '/default-avatar.png'
                          }
                          alt="User menu"
                        />
                      </Menu.Button>
                    </div>
                    <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <NavLink
                              to={item.href}
                              onClick={item.onClick}
                              className={({ isActive }) =>
                                classNames(isActive ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')
                              }
                            >
                              {item.name}
                            </NavLink>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={NavLink} // Change to NavLink
                  to={item.href} // Add to prop for navigation
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              <div className="relative">
                <Menu as="div" className="relative">
                  <Menu.Button className="block w-full rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                    Profile
                  </Menu.Button>
                  <Menu.Items className="absolute left-0 mt-1 w-full origin-top-right bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {userNavigation.map((item) => (
                      <Menu.Item key={item.name}>
                        {({ active }) => (
                          <NavLink
                            to={item.href}
                            onClick={item.onClick}
                            className={({ isActive }) =>
                              classNames(isActive ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')
                            }
                          >
                            {item.name}
                          </NavLink>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Menu>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;
