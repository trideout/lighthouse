import React, { Component } from "react";
import {Route,NavLink,HashRouter} from "react-router-dom";
import Blogs from "./Blogs";

class Main extends Component {
    render() {
        return (
            <HashRouter>
            <div>
                <nav className="flex items-center justify-between flex-wrap bg-teal p-6">
                    <div className="flex items-center flex-no-shrink text-white mr-6">
                        <span className="font-semibold text-xl tracking-tight">PeakPHP Sample Blog</span>
                    </div>
                    <div className="block lg:hidden">
                        <button
                            className="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white">
                            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>
                                Menu</title>
                                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                            </svg>
                        </button>
                    </div>
                    <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                        <div className="text-sm lg:flex-grow">
                            <NavLink exact to="/" className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4">Home</NavLink>
                            <NavLink to="/latest"
                                     className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4">Latest</NavLink>
                            <NavLink to="/create"
                                     className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4">Create Post</NavLink>
                        </div>
                        <div>
                            <a href="https://github.com/trideout/lighthouse"
                               className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal hover:bg-white mt-4 lg:mt-0">Download</a>
                        </div>
                    </div>
                </nav>
                <div className="content">
                    <Route path="/" component={Blogs}/>
                    <Route path="/latest" component={Blogs}/>
                    <Route path="/create" component={Blogs}/>
                </div>
            </div>
            </HashRouter>
    );
    }
}

export default Main;