import { PrivateComponent } from "@/components/util/private-component";
import LayoutDashboard from "@/components/layout-dashboard";
import { HorizontalNavCreatePost } from "@/components/post/horizontal-nav-create-post";
import { useAuth } from "@/components/util/context-user";
import { TablePosts } from "@/components/post/table-posts";

const Posts = () => {
  const { organizationId } = useAuth() as any;



  return (
    <>
      <LayoutDashboard title={"Posts"}>
        <div className="flex flex-col flex-1 bg-gray-100">
          <main>
            <div className="max-w-6xl mx-auto py-6">

              <div className="px-4 mx-auto mt-6 sm:px-6 md:px-8">
                <HorizontalNavCreatePost />

                <div className="mt-8 px-3 py-2 bg-white border border-gray-200 rounded-lg">
                  <nav className="flex flex-wrap gap-4">
                    <a
                      href="#"
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 transition-all duration-200 bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-100 group whitespace-nowrap"
                    >
                      {" "}
                      Publisher{" "}
                    </a>

                    <a
                      href="#"
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 transition-all duration-200 bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-100 group whitespace-nowrap"
                    >
                      {" "}
                      Drafter{" "}
                    </a>

                    <a
                      href="#"
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 transition-all duration-200 bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-100 group whitespace-nowrap"
                    >
                      {" "}
                      Scheduled{" "}
                    </a>
                  </nav>
                </div>


                <div className="flow-root">

                  {organizationId ? <TablePosts organizationId={organizationId} /> : null}

                </div>

              </div>

            </div>
          </main>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(Posts);
