import { PrivateComponent } from "@/components/util/private-component";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { LayoutDashboard } from "@/components/layout-dashboard";
import { HorizontalNavSetting } from "@/components/setting/horizontal-nav-setting";
import { Button, Card, Col, Pagination, Row } from "antd";
import { DeleteOutlined, DownloadOutlined, EditOutlined, FundViewOutlined, PoweroffOutlined } from "@ant-design/icons";


const people = [
    {
        name: 'Jane Cooper',
        title: 'Regional Paradigm Technician',
        department: 'Optimization',
        role: 'Admin',
        email: 'jane.cooper@example.com',
        image: 'https://bit.ly/33HnjK0',
    },
    {
        name: 'John Doe',
        title: 'Regional Paradigm Technician',
        department: 'Optimization',
        role: 'Tester',
        email: 'john.doe@example.com',
        image: 'https://bit.ly/3I9nL2D',
    },
    {
        name: 'Veronica Lodge',
        title: 'Regional Paradigm Technician',
        department: 'Optimization',
        role: ' Software Engineer',
        email: 'veronica.lodge@example.com',
        image: 'https://bit.ly/3vaOTe1',
    },
    // More people...
];


const Billing = () => {
    const onSubmit: SubmitHandler<any> = (payload: any) => {
        // let data = new FormData();
        // data.append("confirm", `${payload.confirm}`);
        // payload?.attachment?.fileList?.length > 0 &&
        //   payload?.attachment?.fileList.forEach((file: any) => {
        //     data.append("attachment", file as RcFile);
        //   });

        console.log("payload =======>", payload);
    };

    return (
        <>
            <LayoutDashboard title={"Profile"}>


                <div className="flex flex-1 flex-col">
                    <main>
                        <div className="mx-auto max-w-6xl py-6">
                            <div className="mx-auto px-4 sm:px-6 md:px-8">
                                <div className="max-w-md">
                                    <h1 className="text-lg font-bold text-gray-900">Billing</h1>
                                </div>
                            </div>

                            <div className="mx-auto mt-8 px-4 sm:px-6 md:px-8">

                                <HorizontalNavSetting />


                                {/* <div className="mt-8 bg-white border-gray-200 rounded-xl"> */}

                                {/* <Row>
                                        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                                        <Button type="primary" icon={<DownloadOutlined />} size={'large'}>
                                                Create
                                            </Button>
                                        </Col>
                                        <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                                        <Button type="primary" icon={<DownloadOutlined />} size={'large'}>
                                                Download
                                            </Button>
                                        </Col>
                                        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                                            <Button type="primary" icon={<DownloadOutlined />} size={'large'}>
                                                Download
                                            </Button>
                                        </Col>
                                    </Row> */}



                                {/* <div className="flex flex-col mt-4">
                                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                            <div className="flex items-center justify-between">
                                                <p className="text-xl font-bold text-gray-900">Sales</p>

                                                <div className="inline-flex items-center justify-end">
                                                    <label className="text-sm font-medium text-gray-900"> Sort: </label>
                                                    <select id="sort" name="sort" className="block w-full py-2 pl-1 pr-10 text-base border-gray-300 border-none rounded-lg focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm">
                                                        <option>Popularity</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="flex flex-col mt-4 lg:mt-8">
                                                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                                        <table className="min-w-full lg:divide-y lg:divide-gray-200">
                                                            <thead className="hidden lg:table-header-group">
                                                                <tr>
                                                                    <th className="py-3.5 pl-4 pr-3 text-left text-sm whitespace-nowrap font-medium text-gray-500 sm:pl-6 md:pl-0">
                                                                        <div className="flex items-center">
                                                                            ID
                                                                            <svg className="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                                                            </svg>
                                                                        </div>
                                                                    </th>

                                                                    <th className="py-3.5 px-3 text-left text-sm whitespace-nowrap font-medium text-gray-500">
                                                                        <div className="flex items-center">
                                                                            Product
                                                                            <svg className="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                                                            </svg>
                                                                        </div>
                                                                    </th>

                                                                    <th className="py-3.5 px-3 text-left text-sm whitespace-nowrap font-medium text-gray-500">
                                                                        <div className="flex items-center">
                                                                            Customer Name
                                                                            <svg className="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                                                            </svg>
                                                                        </div>
                                                                    </th>

                                                                    <th className="py-3.5 px-3 text-left text-sm whitespace-nowrap font-medium text-gray-500">
                                                                        <div className="flex items-center">
                                                                            Date
                                                                            <svg className="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                                                            </svg>
                                                                        </div>
                                                                    </th>

                                                                    <th className="py-3.5 px-3 text-left text-sm whitespace-nowrap font-medium text-gray-500">
                                                                        <div className="flex items-center">
                                                                            Price
                                                                            <svg className="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                                                            </svg>
                                                                        </div>
                                                                    </th>

                                                                    <th className="py-3.5 px-3 text-left text-sm whitespace-nowrap font-medium text-gray-500">
                                                                        <div className="flex items-center">
                                                                            Status
                                                                            <svg className="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                                                            </svg>
                                                                        </div>
                                                                    </th>

                                                                    <th className="relative py-3.5 pl-3 pr-4 sm:pr-6 md:pr-0">
                                                                        <span className="sr-only"> Actions </span>
                                                                    </th>
                                                                </tr>
                                                            </thead>

                                                            <tbody className="divide-y divide-gray-200">
                                                                
                                                                <tr>
                                                                    <td className="hidden py-4 pl-4 pr-3 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap sm:pl-6 md:pl-0">#23848</td>

                                                                    <td className="px-4 py-4 text-sm font-bold text-gray-900 whitespace-nowrap">
                                                                        <div className="inline-flex items-center">
                                                                            <img className="flex-shrink-0 object-cover w-8 h-8 mr-3 rounded-full" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/table-list/1/clarity-ecommerce-logo.png" alt="" />
                                                                            Clarity eCommerce UI Kit
                                                                        </div>
                                                                        <div className="space-y-1 lg:hidden pl-11">
                                                                            <p className="text-sm font-medium text-gray-500">#29345</p>
                                                                            <p className="text-sm font-medium text-gray-500">07 January, 2022</p>
                                                                        </div>
                                                                    </td>

                                                                    <td className="hidden px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">Savannah Nguyen</td>

                                                                    <td className="hidden px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">07 January, 2022</td>

                                                                    <td className="hidden px-4 py-4 text-sm font-bold text-gray-900 lg:table-cell whitespace-nowrap">$99.00</td>

                                                                    <td className="hidden px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">
                                                                        <div className="inline-flex items-center">
                                                                            <svg className="mr-1.5 h-2.5 w-2.5 text-green-500" fill="currentColor" viewBox="0 0 8 8">
                                                                                <circle cx="4" cy="4" r="3" />
                                                                            </svg>
                                                                            Complete
                                                                        </div>
                                                                    </td>

                                                                    <td className="px-4 py-4 text-sm font-medium text-right text-gray-900 whitespace-nowrap">
                                                                        <button type="button" className="inline-flex items-center justify-center w-8 h-8 text-gray-400 transition-all duration-200 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
                                                                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                                                                            </svg>
                                                                        </button>
                                                                        <div className="mt-1 lg:hidden">
                                                                            <p>$99.00</p>
                                                                            <div className="inline-flex items-center justify-end mt-1">
                                                                                <svg className="mr-1.5 h-2.5 w-2.5 text-green-500" fill="currentColor" viewBox="0 0 8 8">
                                                                                    <circle cx="4" cy="4" r="3" />
                                                                                </svg>
                                                                                Complete
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>

                                                                <tr>
                                                                    <td className="hidden py-4 pl-4 pr-3 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap sm:pl-6 md:pl-0">#23466</td>

                                                                    <td className="px-4 py-4 text-sm font-bold text-gray-900 whitespace-nowrap">
                                                                        <div className="inline-flex items-center">
                                                                            <img className="flex-shrink-0 object-cover w-8 h-8 mr-3 rounded-full" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/table-list/1/clarity-ecommerce-logo.png" alt="" />
                                                                            Clarity eCommerce UI Kit
                                                                        </div>
                                                                        <div className="space-y-1 lg:hidden pl-11">
                                                                            <p className="text-sm font-medium text-gray-500">#29345</p>
                                                                            <p className="text-sm font-medium text-gray-500">07 January, 2022</p>
                                                                        </div>
                                                                    </td>

                                                                    <td className="hidden px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">Dianne Russell</td>

                                                                    <td className="hidden px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">06 January, 2022</td>

                                                                    <td className="hidden px-4 py-4 text-sm font-bold text-gray-900 lg:table-cell whitespace-nowrap">$59.00</td>

                                                                    <td className="hidden px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">
                                                                        <div className="inline-flex items-center">
                                                                            <svg className="mr-1.5 h-2.5 w-2.5 text-yellow-500" fill="currentColor" viewBox="0 0 8 8">
                                                                                <circle cx="4" cy="4" r="3" />
                                                                            </svg>
                                                                            Pending
                                                                        </div>
                                                                    </td>

                                                                    <td className="px-4 py-4 text-sm font-medium text-right text-gray-900 whitespace-nowrap">
                                                                        <button type="button" className="inline-flex items-center justify-center w-8 h-8 text-gray-400 transition-all duration-200 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
                                                                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                                                                            </svg>
                                                                        </button>
                                                                        <div className="mt-1 lg:hidden">
                                                                            <p>$59.00</p>
                                                                            <div className="inline-flex items-center justify-end mt-1">
                                                                                <svg className="mr-1.5 h-2.5 w-2.5 text-yellow-500" fill="currentColor" viewBox="0 0 8 8">
                                                                                    <circle cx="4" cy="4" r="3" />
                                                                                </svg>
                                                                                Pending
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>

                                                                <tr>
                                                                    <td className="hidden py-4 pl-4 pr-3 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap sm:pl-6 md:pl-0">#19394</td>

                                                                    <td className="px-4 py-4 text-sm font-bold text-gray-900 whitespace-nowrap">
                                                                        <div className="inline-flex items-center">
                                                                            <img className="flex-shrink-0 object-cover w-8 h-8 mr-3 rounded-full" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/table-list/1/clarity-landing-logo.png" alt="" />
                                                                            Clarity Landing UI Kit
                                                                        </div>
                                                                        <div className="space-y-1 lg:hidden pl-11">
                                                                            <p className="text-sm font-medium text-gray-500">#29345</p>
                                                                            <p className="text-sm font-medium text-gray-500">07 January, 2022</p>
                                                                        </div>
                                                                    </td>

                                                                    <td className="hidden px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">Annette Black</td>

                                                                    <td className="hidden px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">05 January, 2022</td>

                                                                    <td className="hidden px-4 py-4 text-sm font-bold text-gray-900 lg:table-cell whitespace-nowrap">$49.00</td>

                                                                    <td className="hidden px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">
                                                                        <div className="inline-flex items-center">
                                                                            <svg className="mr-1.5 h-2.5 w-2.5 text-gray-300" fill="currentColor" viewBox="0 0 8 8">
                                                                                <circle cx="4" cy="4" r="3" />
                                                                            </svg>
                                                                            Canceled
                                                                        </div>
                                                                    </td>

                                                                    <td className="px-4 py-4 text-sm font-medium text-right text-gray-900 whitespace-nowrap">
                                                                        <button type="button" className="inline-flex items-center justify-center w-8 h-8 text-gray-400 transition-all duration-200 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
                                                                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                                                                            </svg>
                                                                        </button>
                                                                        <div className="mt-1 lg:hidden">
                                                                            <p>$49.00</p>
                                                                            <div className="inline-flex items-center justify-end mt-1">
                                                                                <svg className="mr-1.5 h-2.5 w-2.5 text-gray-300" fill="currentColor" viewBox="0 0 8 8">
                                                                                    <circle cx="4" cy="4" r="3" />
                                                                                </svg>
                                                                                Canceled
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>

                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div> */}




                                <div className="border-gray-200 pt-6 lg:order-1 lg:col-span-10">
                                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                            <table className="min-w-full lg:divide-y lg:divide-gray-200">
                                                <thead className="hidden lg:table-header-group">
                                                    <tr>
                                                        <th className="px-4 py-3.5 text-left text-xs font-medium uppercase tracking-widest text-gray-500">Customer</th>

                                                        <th className="px-4 py-3.5 text-left text-xs font-medium uppercase tracking-widest text-gray-500">Email Address</th>

                                                        <th className="px-4 py-3.5 text-left text-xs font-medium uppercase tracking-widest text-gray-500">Phone Number</th>

                                                        <th className="hidden px-4 py-3.5 text-left text-xs font-medium uppercase tracking-widest text-gray-500 xl:table-cell">Join Date</th>

                                                        <th className="px-4 py-3.5 text-left text-xs font-medium uppercase tracking-widest text-gray-500">Country</th>

                                                        <th className="relative px-4 py-3.5 md:pr-0">
                                                            <span className="sr-only"> Actions </span>
                                                        </th>
                                                    </tr>
                                                </thead>

                                                <tbody className="divide-y divide-gray-200">

                                                    {people.map((person, index) => (


                                                        <tr key={index} className="bg-white">
                                                            <td className="whitespace-nowrap p-4 align-top text-sm font-bold text-gray-900 lg:align-middle">
                                                                <div className="flex items-center">
                                                                    <img className="mr-3 size-8 shrink-0 rounded-full object-cover" src={person?.image} alt="" />
                                                                    {person?.name}
                                                                </div>
                                                            </td>

                                                            <td className="hidden whitespace-nowrap p-4 text-sm font-medium text-gray-900 lg:table-cell">
                                                                <div className="flex items-center">
                                                                    {person?.email}
                                                                </div>
                                                            </td>

                                                            <td className="hidden whitespace-nowrap p-4 text-sm font-medium text-gray-900 lg:table-cell">
                                                                <div className="flex items-center">
                                                                    (480) 555-0103
                                                                </div>
                                                            </td>

                                                            <td className="whitespace-nowrap p-4 text-right align-top text-sm font-medium text-gray-900 lg:text-left lg:align-middle">
                                                                <div className="flex items-center">
                                                                    Janvier 9, 2002
                                                                </div>
                                                            </td>

                                                            <td className="whitespace-nowrap p-4 text-right align-top text-sm font-medium text-gray-900 lg:text-left lg:align-middle">USA</td>

                                                            <td className="whitespace-nowrap p-4 text-right align-top text-sm font-medium text-gray-900 lg:text-left lg:align-middle">
                                                                <div className="flex items-center space-x-4">

                                                                    {/* <Button
                                                                            type="text"
                                                                            icon={<FundViewOutlined />}
                                                                        >
                                                                        </Button>

                                                                        <Button
                                                                            type="link"
                                                                            icon={<EditOutlined />}
                                                                        >
                                                                        </Button> */}

                                                                    <Button
                                                                        type="link"
                                                                        icon={<DownloadOutlined />}
                                                                    >
                                                                        download
                                                                    </Button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}


                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>


                                {/* </div> */}



                            </div>
                        </div>
                    </main>
                </div>
            </LayoutDashboard>








        </>
    );
};

export default PrivateComponent(Billing);
