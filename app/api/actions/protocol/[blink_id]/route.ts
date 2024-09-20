import { BlinkInterface } from '@/interfaces/models.interface'
import {
  blinkError,
  generatePaymentBlink,
  validatedQueryParams,
} from '@/lib/blink.lib'
import { BlinkService } from '@/lib/services/blink.service'
import { SendNativeSol } from '@/lib/solana.lib'
import { getSplTokenAddress, SendSplToken } from '@/lib/spl.helpers'
import {
  ActionPostRequest,
  ActionPostResponse,
  ACTIONS_CORS_HEADERS,
  createPostResponse,
} from '@solana/actions'
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  Transaction,
} from '@solana/web3.js'

const headers = ACTIONS_CORS_HEADERS

const handleError = (message: string, status: number = 400) => {
  return new Response(message, { status, headers });
}

export const GET = async (
  req: Request,
  { params }: { params: { blink_id: string } }
) => {
  const requestUrl = new URL(req.url);
  const { blink_id } = params;

  if (!blink_id) {
    return blinkError("'blink' URL param not found");
  }

  const blink = await BlinkService.getOneBlink(blink_id);

  if (!blink.data) {
    return blinkError('Blink Not Found');
  }

  const data = blink.data as BlinkInterface;
  const toPubkey = new PublicKey(data?.pub_key);
  const baseHref = new URL(
    `/api/actions/blink?blink=${blink_id}&to=${toPubkey.toBase58()}`,
    requestUrl.origin
  ).toString();

  return generatePaymentBlink({
    title: data.title,
    description: data.description || '',
    icon: data.image_url || '',
    label: data.image_url || '',
    baseURL: baseHref,
  });
}

export const POST = async (req: Request) => {
  console.log('Request received at', new Date(Date.now()).toLocaleTimeString());
  const requestUrl = new URL(req.url);
  const { amount, toPubkey, token } = validatedQueryParams(requestUrl);

  try {
    const body: ActionPostRequest = await req.json();
    
    let account: PublicKey;
    try {
      account = new PublicKey(body.account);
    } catch {
      return handleError('Invalid "account" provided');
    }

    const connection = new Connection(clusterApiUrl('mainnet-beta'));
    let transaction: Transaction;

    if (token === 'sol') {
      transaction = await SendNativeSol(connection, {
        amount,
        toPubkey,
        fromPubkey: account,
      });
    } else {
      transaction = await SendSplToken(connection, {
        amount,
        fromPubKey: account,
        toPubKey: toPubkey,
        mintAddress: new PublicKey(getSplTokenAddress(token) || ''),
      });
    }

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction,
        message: `Sent ${amount} ${token.toUpperCase()} to: ${toPubkey.toBase58()}`,
      },
    });

    return Response.json(payload, { headers });
  } catch (error: any) {
    console.log(error);
    return Response.json({
      error: error.message || 'An unknown error occurred',
    });
  }
}

export const OPTIONS = (req: Request) => {
  return Response.json(null, { headers });
}
