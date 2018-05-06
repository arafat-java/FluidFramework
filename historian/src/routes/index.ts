import { Router } from "express";
import * as nconf from "nconf";
import { ICache, ITenantService } from "../services";
import * as blobs from "./git/blobs";
import * as commits from "./git/commits";
import * as refs from "./git/refs";
import * as tags from "./git/tags";
import * as trees from "./git/trees";
import * as repositoryCommits from "./repository/commits";
import * as contents from "./repository/contents";
import * as headers from "./repository/headers";

export interface IRoutes {
    git: {
        blobs: Router;
        commits: Router;
        refs: Router;
        tags: Router;
        trees: Router;
    };
    repository: {
        commits: Router;
        contents: Router;
        headers: Router;
    };
}

export function create(store: nconf.Provider, tenantService: ITenantService, cache: ICache): IRoutes {
    return {
        git: {
            blobs: blobs.create(store, tenantService, cache),
            commits: commits.create(store, tenantService, cache),
            refs: refs.create(store, tenantService, cache),
            tags: tags.create(store, tenantService, cache),
            trees: trees.create(store, tenantService, cache),
        },
        repository: {
            commits: repositoryCommits.create(store, tenantService, cache),
            contents: contents.create(store, tenantService, cache),
            headers: headers.create(store, tenantService, cache),
        },
    };
}
