import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";

/**
 * Banner elementti. Näkyy jokaisen sivun yläosassa. react-router-dom NavLink navigoimiseen ja aktiivisen linkin määrittämiseen.
 */

export default function Banner() {
    return (
        <div className="banner">
            <ul>
                <li>
                    <NavLink
                        data-testid="harjaus-link"
                        to={"/hiekanpuhdistus"}
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        }
                    >
                        Harjaus
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        data-testid="auraus-link"
                        to={"/auraus"}
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        }
                    >
                        Auraus
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        data-testid="hiekoitus-link"
                        to={"/hiekoitus"}
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        }
                    >
                        Hiekoitus
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}
