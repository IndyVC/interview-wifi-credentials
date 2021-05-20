import { IVisitor as IVisitorEvent } from "../proxyclick/visitors";
import { VisitorsService } from "../proxyclick/visitors";
import { CredentialsService, ICredentials } from "../proxyclick/credentials";
import { exists, fetch, remove, store } from "../cache/cache";

export interface Visitor {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  companyName: string;
}

/**
 * In response of a check-in event, returns a WiFi credentials object
 * @param visitorEvent the visitor event checking in
 * @returns a credentials object, containing the credentials for this visitor
 */
export async function handleCheckin(visitorEvent: Partial<IVisitorEvent>) {
  //Fetched all visitors
  const visitors: Visitor[] = await VisitorsService.getVisitors({
    email: visitorEvent.email,
  });

  //Filter for match based on email
  const match = visitors.find((v) => v.email === visitorEvent.email);
  //Exit when no match is found
  if (!match) {
    throw "Visitor not found";
  }

  let credentials;
  if (
    (visitorEvent.firstname && match.firstname !== visitorEvent.firstname) ||
    (visitorEvent.lastname && match.lastname !== visitorEvent.lastname)
  ) {
    //Check for mismatch
    //If mismatch, update visitor + remove cached credentials
    VisitorsService.updateVisitor(match.email, {
      firstname: visitorEvent.firstname,
      lastname: visitorEvent.lastname,
    });
    remove(match.id);
    credentials = CredentialsService.generate(
      visitorEvent.firstname ?? match.firstname,
      visitorEvent.lastname ?? match.lastname,
      match.email
    );
  } else {
    //return cached credentials
    if (exists(match.id)) {
      return fetch(match.id);
    }
    credentials = CredentialsService.generate(
      match.firstname,
      match.lastname,
      match.email
    );
  }

  store(match.id, credentials);
  return credentials;
}
